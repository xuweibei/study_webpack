import React from "react";

export default class App extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      Text: null
    };
  }
  getList(){
    import('./main.jsx').then(res=>{
        console.log(res,'个')
        this.setState({
            Text:res.default
        })
    })
  };

  render() {
    const { Text } = this.state;
    
    return (
      <div className="lala">
        {Text ? <Text /> : ""}
        {"水电费 二条"}
        <div onClick={this.getList.bind(this)}>{'获取一下'}</div>
      </div>
    );
  }
}
