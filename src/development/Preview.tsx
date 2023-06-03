import * as React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorStackTrace from './ErrorStackTrace/ErrorStackTrace';
import DynamicComponent from '@/components/DynamicComponent/DynamicComponent';
import GlobalStyle from '@/GlobalStyles';

const App = () => (
  <>
    <GlobalStyle />
    <ErrorStackTrace>
      <div className='text-red-600 bg-blue-600'>hello tailwind</div>
      <DynamicComponent />
    </ErrorStackTrace>
  </>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') || document.createElement('div')
);
root.render(<App />);
