import * as React from 'react';
import clsx from 'clsx';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import * as En from 'blockly/msg/en';

const toolbox = {
  kind: 'flyoutToolbox',
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
    {
      kind: 'block',
      type: 'result_variable',
    },
  ],
};

const theme = Blockly.Theme.defineTheme('bionario', {
  name: 'bionario',
  base: Blockly.Themes.Zelos,
  componentStyles: {
    workspaceBackgroundColour: 'black',
  },
});

const BlocklyWorkspace: React.FC = () => {
  const blocklyDivRef = React.useRef<HTMLDivElement>(null);
  const isBlocklyInitializedRef = React.useRef(false);

  React.useEffect(() => {
    const currentBlocklyRef = blocklyDivRef.current;
    if (!currentBlocklyRef || isBlocklyInitializedRef.current) {
      return;
    }
    isBlocklyInitializedRef.current = true;
    Blockly.setLocale(En);
    javascriptGenerator['result_variable'] = function(block: any) {
      console.log({ block });
      const code = ';\n';
      return code;
    };
    Blockly.defineBlocksWithJsonArray([
      {
        type: 'result_variable',
        message0: 'set result to %1',
        args0: [
          {
            type: 'input_value',
            name: 'result',
            check: 'Number',
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 330,
      },
    ]);
    Blockly.inject(currentBlocklyRef, {
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
    });
  }, [blocklyDivRef.current, isBlocklyInitializedRef.current]);

  return <div ref={blocklyDivRef} className={clsx('h-96')} />;
};

export default BlocklyWorkspace;
