import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.gridX = 50;
    this.gridY = 30;

    this.state =  {
      generations: 0,
    }
    //if adding functions follow this template
    //this.functionName = this.functionName.bind(this);
  }
    //then add function here, or inside applicable component
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Conway's Game of Life</h1>
        </header>
        <Grid
          rows={this.gridX}
          cols={this.gridY} 
        />
        <h2> Generation: {this.state.generations}</h2>
      </div>
    );
  }
}

class Grid extends Component {
  
  render() {
    const  { gridX, gridY } = this.props;   
    const width = gridX * 18;
    let gridArr = [];

    return (
      <div 
        className="grid"
        style={{ width: width }}
      >
        insert grid here {gridX}
      </div>
    )
  }
}


export default App;
