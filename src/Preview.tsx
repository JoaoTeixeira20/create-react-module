import * as React from 'react'
import ReactDOM from 'react-dom/client';
import SampleComponent from './components/SampleComponent/SampleComponent';

// App Component
const App = () => (<div>
    <SampleComponent content={`im a new component :)`}/>
</div>)
// Mount component 
const root = ReactDOM.createRoot(
    document.getElementById('root') || document.createElement('div')
);
root.render(<App />);
