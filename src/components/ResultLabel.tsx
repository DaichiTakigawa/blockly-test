import * as React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectResult } from '../ducks/blockly';

const ResultLabel: React.FC = () => {
  const result = useSelector(selectResult);
  return (
    <div>
      <label className={clsx('text-lg', 'font-bold')}>
        {result !== undefined ? result : 'result = 0'}
      </label>
    </div>
  );
};

export default ResultLabel;
