import * as React from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../store';
import { selectCode, setResult } from '../ducks/blockly';
import { simulator } from '../modles';

const PlayButton: React.FC = () => {
  const code = useSelector(selectCode);
  const dispatch: AppDispatch = useDispatch();

  const onClick = React.useCallback(() => {
    if (code === undefined) {
      return;
    }
    const result = simulator.simulate(code);
    if (result === undefined) {
      return;
    }
    dispatch(setResult({ result: `result = ${result}` }));
  }, [dispatch, code]);

  return (
    <div>
      <button className={clsx('btn', 'btn-primary')} onClick={onClick}>
        play
      </button>
    </div>
  );
};

export default PlayButton;
