import * as React from 'react';
import clsx from 'clsx';

const EditButton: React.FC = () => {
  return (
    <div>
      <label
        htmlFor="blockly-modal"
        className={clsx('btn', 'btn-primary', 'btn-outline', 'modal-button')}
      >
        edit
      </label>
    </div>
  );
};

export default EditButton;
