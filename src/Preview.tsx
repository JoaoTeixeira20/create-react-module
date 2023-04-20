import * as React from 'react'
import ReactDOM from 'react-dom/client';
import DynamicComponent from './components/DynamicComponent/DynamicComponent';

const App = () => (<div>
    <DynamicComponent />
</div>)

const root = ReactDOM.createRoot(
    document.getElementById('root') || document.createElement('div')
);
root.render(<App />);
