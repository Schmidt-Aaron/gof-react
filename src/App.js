import React, { Component } from 'react';
import './App.css';

//helper functions
const makeArray = (cols, rows, random) => {
  /** 
   * @random should a bolean
   * will fill the array with either 0 or 1  if set to true  
  **/
  let density = 0.8; // modifies the density of the alive cells for initial grid.
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr.length; j++ ){
      !random 
        ? arr[i][j] = 0
        : arr[i][j] = ( Math.round( Math.random() * density )); 
    }
  }
  return arr;
}

//main component
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generation: 0,
      rows: 50,
      cols: 50,
      gameArray: [],
      isRunning: false,
      speed: 500,
        
    }
      
    //app function bindings
    this.newRandomGrid = this.newRandomGrid.bind(this);
    this.incrementGeneration = this.incrementGeneration.bind(this);
  }

  /**** app functions ****/
  //startover with new random board
  newRandomGrid() {
    this.setState( (prevState) => ({
      gameArray: makeArray(this.state.cols, this.state.rows, true),
      generation: 0,
      isRunning: false,
    })) 
  }

  // increases generation
  incrementGeneration() {
    this.setState( (prevState) => ({
      generation: prevState.generation += 1,
    })) 
  }

  //calculates cell neighbors and assigns the score 
  calculateNeighbors(arr) {
    
  }

  componentWillMount(){
    if(this.state.gameArray.length === 0 ) {
      this.setState( (prevState) => ({
        gameArray: makeArray(this.state.cols, this.state.rows, false),
      }))
    } 
  }

  render() {
    const generation = this.state.generation;

    return (
      <div className="App">
        <div className="header">
          <h1>Conway's GoL in React</h1>
        </div>
        <Grid 
          game={this.state.gameArray}
        />
        <h2>Generation: {generation}</h2>
        <button onClick={() => this.newRandomGrid()} >
          Random
        </button>
        <button onClick={() => this.incrementGeneration()} >
          Increment
        </button>
      </div>
    );
  }
} //end main

// does this need state => change into function?
class Grid extends Component {
  render() {
    const game = this.props.game;
    return (
      <div 
        className="grid"  
      >
      {game.map((e, i) => 
        <Row
          key={i} 
          index={i}
          rowArray={e}
        />
        )
      }
      </div>
    );
  }
}

class Row extends Component {
  render() {
    const rowArray = this.props.rowArray;
    const index = this.props.index;
    return (
      <div>
        {rowArray.map((e,i) =>
          <Cell
            key={`${index}_${i}`} 
            index={`${index}_${i}`}
            alive={rowArray[i]}
          />
        )}
      </div>
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <div 
        className={this.props.alive === 1 ? "box alive" : "box"}
        alive="use props"
        key={this.props.index}
      >
      cell
      </div>
    );
  }
}

export default App;
