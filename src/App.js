import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    

    this.state =  {
      generations: 0,
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
  render(){
    const {
      xPos,
      yPos,
      cellID,
    } = this.props;

    return ( 
      <div
        id={cellID}
        className="box"
        xpos={xPos}
        ypos={yPos}
      />
    );
  }

}

class Grid extends Component {
  render() {
    const  { gridX, gridY } = this.props;   
    const width = gridX * 10;
    let gridArr = [];

    for ( let i = 0; i < gridY; i++ ) {
      for( let j = 0; j < gridX; j++ ){
        let cellID = `${i}_${j}`;
        
        gridArr.push(
          <Box
            key={cellID}
            cellID={cellID}  
            xPos={i}
            yPos={j}
          />
        )
      }
    }

    return (
      <div 
        className="grid"
        style={{width: width}}
      >
        {gridArr}
      </div>
    );
  }
}


export default App;
