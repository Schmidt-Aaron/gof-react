import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    

    this.state =  {
      generations: 5,
      gridX: 50,
      gridY: 30,
    }
    //if adding functions follow this template
    //this.functionName = this.functionName.bind(this);
  }
    //then add function here, or inside applicable component
  
  render() {
    const { 
      gridX, 
      gridY, 
      generations, 
    } = this.state;

    return (
      <div className="App">
        <header>
          <h1 className="App-title">Conway's Game of Life</h1>
        </header>
        <Grid
          gridX={gridX}
          gridY={gridY} 
        />
        <h2> Generation: {generations}</h2>
      </div>
    );
  }
}

class Box extends Component {

}

class Grid extends Component {
  
  render() {
    const  { gridX, gridY } = this.props;   
    const width = gridX * 18;
    let gridArr = [];

    for ( let i = 0; i < gridX; i++ ) {
      for( let j = 0; j < gridY; j++ ){
        let cellID = `${i}_${j}`;
        gridArr.push(
          <span id={cellID} key={cellID} className="box"></span>
        )
      }
    }

    return (
      <div 
        className="grid"
        // style={{ width: width }}
      >
        {gridArr}
      </div>
    )
  }
}


export default App;
