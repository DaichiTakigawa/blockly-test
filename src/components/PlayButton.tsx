import * as React from 'react';
import clsx from 'clsx';

const PlayButton: React.FC = () => {
  return (
    <div>
      <button className={clsx('btn', 'btn-primary')}>play</button>
    </div>
  );
};

export default PlayButton;
