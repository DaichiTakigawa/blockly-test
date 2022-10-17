import * as React from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../store';
import { selectCode, setResult } from '../ducks/blockly';

const PlayButton: React.FC = () => {
  const code = useSelector(selectCode);
  const dispatch: AppDispatch = useDispatch();

  const onClick = React.useCallback(() => {
    if (code === undefined) {
      return;
    }
    console.log({ code });
    const tmpCode = `${code}\nresult;\n`;
    let result = '';
    try {
      result = eval(tmpCode);
    } catch (e) {
      console.error(e);
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
