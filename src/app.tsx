import * as React from 'react';
import clsx from 'clsx';
import { Provider } from 'react-redux';
import { store } from './store';
import {
  BlocklyModal,
  CodePreview,
  EditButton,
  PlayButton,
  ResultLabel,
} from './components';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className={clsx(
        'h-screen',
        'w-full',
        'flex',
        'flex-col',
        'justify-center',
        'items-center'
      )}
    >
      {children}
    </div>
  );
};

const ButtonList: React.FC = () => {
  return (
    <div
      className={clsx(
        'mb-8',
        'flex',
        'flex-row',
        'justify-center',
        'items-center',
        'gap-4'
      )}
    >
      <PlayButton />
      <EditButton />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container>
        <ButtonList />
        <CodePreview />
        <ResultLabel />
      </Container>
      <BlocklyModal />
    </Provider>
  );
};

export default App;
