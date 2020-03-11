import React from 'react';
import {render} from 'react-dom';


class App extends React.Component{
    render(){
        return <div>{'啦啦啦啦'}</div>
    }
}


render(
    <App />,
    document.getElementById('root')
)