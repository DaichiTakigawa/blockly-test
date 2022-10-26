/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { BlocklyWorkspace } from '../../components/blockly';
import { simulator } from '../../modles';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../store';
import { saveWorkspace } from '../../ducks/blockly';
import { type BlocklyOptions } from 'blockly/core';

const ConnectedBlocklyWorkspace: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const theme = React.useMemo(() => {
    let theme = Blockly.registry.getObject(
      Blockly.registry.Type.THEME,
      'bionario'
    );
    if (!theme) {
      theme = Blockly.Theme.defineTheme('bionario', {
        name: 'bionario',
        base: Blockly.Themes.Zelos,
        componentStyles: {
          workspaceBackgroundColour: 'black',
        },
      });
    }
    return theme;
  }, []);

  const toolbox = React.useMemo(() => {
    const contents = [
      {
        kind: 'block',
        type: 'controls_if',
      },
      {
        kind: 'block',
        type: 'logic_compare',
      },
      {
        kind: 'block',
        type: 'math_arithmetic',
      },
      {
        kind: 'block',
        type: 'math_number',
      },
      {
        kind: 'block',
        type: 'result_variable',
      },
    ];
    for (const variable of Object.values(simulator.graph)) {
      contents.push({
        kind: 'block',
        type: variable.id,
      });
    }
    const toolbox = {
      kind: 'flyoutToolbox',
      contents: contents,
    };
    return toolbox;
  }, [simulator]);

  const defineBlocks = React.useMemo(() => {
    const defineBlocks: any[] = [
      {
        type: 'result_variable',
        message0: 'set result to %1',
        args0: [
          {
            type: 'input_value',
            name: 'value',
            check: 'Number',
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 330,
      },
    ];
    for (const variable of Object.values(simulator.graph)) {
      defineBlocks.push({
        type: variable.id,
        message0: variable.name,
        output: 'Number',
        colour: 330,
      });
    }
    return defineBlocks;
  }, [simulator]);

  const blocklyOptions = React.useMemo(
    () =>
      ({
        grid: {
          spacing: 20,
          length: 2,
          colour: 'white',
          snap: false,
        },
        move: {
          scrollbars: {
            horizontal: true,
            vertical: true,
          },
          drag: true,
          wheel: true,
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true,
        },
        trashcan: true,
        theme: theme,
        toolbox: toolbox,
      } as BlocklyOptions),
    [theme, toolbox]
  );

  const actions = React.useMemo(
    () => ({
      saveWorkspace(ws: Blockly.WorkspaceSvg) {
        const workspaceJson = Blockly.serialization.workspaces.save(ws);
        // generate definition
        javascriptGenerator['result_variable'] = (block: any) => {
          const value = javascriptGenerator.valueToCode(
            block,
            'value',
            javascriptGenerator.ORDER_ATOMIC
          );
          const code = `result = ${value};\n`;
          return code;
        };
        for (const variable of Object.values(simulator.graph)) {
          javascriptGenerator[variable.id] = () => {
            return [variable.name, javascriptGenerator.ORDER_NONE];
          };
        }
        const definition = javascriptGenerator.workspaceToCode(ws);
        // generate code
        javascriptGenerator['result_variable'] = (block: any) => {
          const value = javascriptGenerator.valueToCode(
            block,
            'value',
            javascriptGenerator.ORDER_ATOMIC
          );
          const code = `result.value = ${value};\n`;
          return code;
        };
        for (const variable of Object.values(simulator.graph)) {
          javascriptGenerator[variable.id] = () => {
            return [
              `simulationGraph["${variable.id}"].getValue()`,
              javascriptGenerator.ORDER_NONE,
            ];
          };
        }
        const code = javascriptGenerator.workspaceToCode(ws);
        console.log({ definition, code });
        dispatch(
          saveWorkspace({
            workspace: workspaceJson,
            code: code,
            definition: `let result = 0;\n${definition}`,
          })
        );
      },
    }),
    [simulator]
  );

  return (
    <BlocklyWorkspace
      blocklyOptions={blocklyOptions}
      defineBlocks={defineBlocks}
      actions={actions}
    />
  );
};

export default ConnectedBlocklyWorkspace;
