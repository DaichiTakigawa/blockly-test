import * as React from 'react';
import clsx from 'clsx';
import * as Blockly from 'blockly';
import * as Ja from 'blockly/msg/ja';
import { BlocklyWorkspace } from '../containers/blockly';

Blockly.setLocale(Ja);

const BlocklyModal: React.FC = () => {
  return (
    <>
      <input type="checkbox" id="blockly-modal" className="modal-toggle" />
      <div className="modal">
        <div className={clsx('modal-box', 'w-8/12', 'max-w-5xl')}>
          <h3 className={clsx('mb-4', 'text-lg', 'font-bold')}>
            Blockly Editor
          </h3>
          <BlocklyWorkspace />
          <div className={clsx('modal-action')}>
            <label htmlFor="blockly-modal" className={clsx('btn')}>
              close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlocklyModal;
