import * as React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectCode } from '../ducks/blockly';

const CodePreview: React.FC = () => {
  const code = useSelector(selectCode);
  return (
    <div
      className={clsx(
        'mb-8',
        'p-4',
        'min-h-16',
        'rounded-md',
        'border-base-content',
        'border-[1px]',
        'border-opacity-80',
        'whitespace-pre-wrap'
      )}
    >
      <p>{code}</p>
    </div>
  );
};

export default CodePreview;
