import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    

    this.state =  {
      generations: 0,
      gridX: 50,
      gridY: 30,
      isRunning: false,
    }

    //if adding functions follow this template
    //this.functionName = this.functionName.bind(this);
    this.incrementGeneration = this.incrementGeneration.bind(this);

  }
  //then add function here, or inside applicable component
  
  incrementGeneration() {
    if (this.state.isRunning) this.state.generations += 1; 
  }

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
        <button 
          onClick={() => incrementGeneration()}
          className="button"
        >
        Next Gen
        </button>
      </div>
    );
  }
}

class Box extends Component {
  constructor(props) {
    super(props);

    this.state = { alive: false };

    this.selectCell = this.selectCell.bind(this);
  }
  
  selectCell() {
    this.state.alive 
    ? this.setState({ alive: false })
    : this.setState({ alive: true })
  }

  render(){

    const {
      xPos,
      yPos,
      cellID,
      alive,
    } = this.props;

    return ( 
      <div
        id={cellID}
        className={ this.state.alive ? "box on" : "box"}
        xpos={xPos}
        ypos={yPos}
        onClick={ () => this.selectCell() }
      />
    );
  }

}

class Grid extends Component {
  render() {
    const  { gridX, gridY } = this.props;   
    const width = gridX * 14;
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
