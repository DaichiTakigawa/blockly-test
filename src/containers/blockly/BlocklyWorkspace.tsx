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
          toolboxBackgroundColour: '#ddddddE6',
          toolboxForegroundColour: 'black',
          scrollbarColour: '#00000000',
          scrollbarOpacity: 0,
        },
      });
    }
    return theme;
  }, []);

  const toolbox = React.useMemo(() => {
    const contents = [
      {
        kind: 'category',
        name: 'logic',
        colour: 'red',
        contents: [
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
        ],
      },
    ];
    const variableContents = [];
    for (const variable of Object.values(simulator.graph)) {
      variableContents.push({
        kind: 'block',
        type: variable.id,
      });
    }
    variableContents.push({
      kind: 'block',
      type: 'select_variable',
    });
    contents.push({
      kind: 'category',
      name: 'variable',
      colour: 'green',
      contents: variableContents,
    });
    contents.push({
      kind: 'category',
      name: 'result',
      colour: 'blue',
      contents: [
        {
          kind: 'block',
          type: 'result_variable',
        },
        {
          kind: 'block',
          type: 'result_variable',
        },
      ],
    });
    const toolbox = {
      kind: 'categoryToolbox',
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
      {
        type: 'select_variable',
        message0: '%1 %2',
        args0: [
          {
            type: 'field_dropdown',
            name: 'variable_name',
            options: [
              ['variable1', '1'],
              ['variable2', '2'],
              ['variable3', '3'],
            ],
          },
          {
            type: 'field_dropdown',
            name: 'time',
            options: [
              ['t', 't'],
              ['t-1', 't-1'],
            ],
          },
        ],
        output: 'Number',
        colour: 330,
        tooltip: '',
        helpUrl: '',
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
          scrollbars: false,
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
        javascriptGenerator['select_variable'] = () => {
          return ['', javascriptGenerator.ORDER_ATOMIC];
        };
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
            return [variable.name, javascriptGenerator.ORDER_ATOMIC];
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
