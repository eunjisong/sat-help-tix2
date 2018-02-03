import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

//only responsible for rendering it to the dom -- its not a component
ReactDOM.render(
    <Main />,
    document.getElementById('app')
    //react cant work without html so this is appending each component to line 8
);
