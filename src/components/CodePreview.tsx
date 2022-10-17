import * as React from 'react';
import clsx from 'clsx';

const CodePreview: React.FC = () => {
  return (
    <div
      className={clsx(
        'mb-8',
        'p-4',
        'min-h-16',
        'rounded-md',
        'border-base-content',
        'border-[1px]',
        'border-opacity-80'
      )}
    >
      <p>var result = 0;</p>
    </div>
  );
};

export default CodePreview;
