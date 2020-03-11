import React from 'react';
import App from './app.jsx';
import {render} from 'react-dom';
import logo from './images/1.jpg';

import './index.less';

// class App extends React.Component{
//     render(){
//         return <div className="lala">
//             {/* <img src={logo} /> */}
//             {'ewr阿萨德  '} 
//         </div>
//     }
// }

console.log(module.hot,'说了快递费')
alert(1)
render(
    <App/>,
    document.getElementById('root')
)
if(module.hot) {
    module.hot.accept('./app.jsx', () => {
        render(
            <App/>,
            document.getElementById('root')
        )
    })
  }