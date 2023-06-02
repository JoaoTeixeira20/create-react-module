import * as React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorStackTrace from './ErrorStackTrace/ErrorStackTrace';
import DynamicComponent from '@/components/DynamicComponent/DynamicComponent';
import GlobalStyle from '@/GlobalStyles';
import styles from './preview.module.css';

const App = () => (
  <>
    <GlobalStyle />
    <ErrorStackTrace>
      <div className={styles.myClass}>css module import example</div>
      <DynamicComponent />
    </ErrorStackTrace>
  </>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') || document.createElement('div')
);
root.render(<App />);
