import * as React from 'react';
import clsx from 'clsx';

const ResultLabel: React.FC = () => {
  return (
    <div>
      <label className={clsx('text-lg', 'font-bold')}>Result: 0</label>
    </div>
  );
};

export default ResultLabel;
