/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import clsx from 'clsx';
import * as Blockly from 'blockly/core';
import * as En from 'blockly/msg/en';

type Props = {
  blocklyOptions: Blockly.BlocklyOptions;
  defineBlocks: any[];
  actions: {
    saveWorkspace: (workspace: Blockly.WorkspaceSvg) => void;
  };
};

const BlocklyWorkspace: React.FC<Props> = ({
  blocklyOptions,
  defineBlocks,
  actions,
}) => {
  const blocklyDivRef = React.useRef<HTMLDivElement>(null);
  const isBlocklyInitializedRef = React.useRef(false);

  React.useEffect(() => {
    const currentBlocklyRef = blocklyDivRef.current;
    if (!currentBlocklyRef || isBlocklyInitializedRef.current) {
      return;
    }
    isBlocklyInitializedRef.current = true;
    Blockly.setLocale(En);
    Blockly.defineBlocksWithJsonArray(defineBlocks);
    const ws = Blockly.inject(currentBlocklyRef, blocklyOptions);
    const listener = () => {
      actions.saveWorkspace(ws);
    };
    ws.addChangeListener(listener);
  }, [
    blocklyDivRef.current,
    isBlocklyInitializedRef.current,
    blocklyOptions,
    defineBlocks,
    actions,
  ]);

  return <div ref={blocklyDivRef} className={clsx('h-96')} />;
};

export default BlocklyWorkspace;
