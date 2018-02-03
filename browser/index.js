import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

ReactDOM.render(//this is not a component 
                //it is only responsible for rendering info to the DOM
    <Main />,
    document.getElementById('app')
)
