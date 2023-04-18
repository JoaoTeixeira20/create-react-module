import * as React from 'react'
import ReactDOM from 'react-dom/client';
import DynamicComponent from './components/DynamicComponent/DynamicComponent';

// App Component
const App = () => (<div>
    <DynamicComponent />
    <div>i am a beast</div>
</div>)
// Mount component 
const root = ReactDOM.createRoot(
    document.getElementById('root') || document.createElement('div')
);
root.render(<App />);
