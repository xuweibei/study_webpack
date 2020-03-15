//服务端渲染写法

// import React from 'react';
// import {render} from 'react-dom';
const React = require('react');
// const {render} = require('react-dom');
require('./index.css');


class App extends React.Component{
    render(){
        return <div className='lala'>{'哈哈哈哈哈哈哈'}</div>
    }
}



module.exports = <App />