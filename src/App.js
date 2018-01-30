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
      gameArray: this.createNextGenGrid(prevState.gameArray), 
    })) 
  }

  //calculates cell neighbors 
  calculateNeighbors(gameArr, x, y) {
    let sum = 0;
    let cols = this.state.cols;
    let rows = this.state.rows;
    for (let i = -1; i < 2; i++) {
      for(let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += gameArr[col][row]
      }
    }

  sum -= gameArr[x][y]
  return sum;
  }
 
  createNextGenGrid(gameArr) {
    let nextGameArr = gameArr;
    for(let i = 0; i < gameArr.length; i++){
      for(let j = 0; j < gameArr[i].length; j++){
        let cell = gameArr[i][j];
        let neighbors = this.calculateNeighbors(gameArr, i, j);

        if(cell === 0 && neighbors === 3) {
          nextGameArr[i][j] = 1;
        } else if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
          nextGameArr[i][j] = 0;
        } else {
          nextGameArr[i][j] = cell;
        }
      }
    }

    return nextGameArr;
  }

  startGame(){
    this.setState( (prevState) => ({
      isRunning: true,
    }))
  }
  
  stopGame(){
    this.setState( (prevState) => ({
      isRunning: false,
    }))
  }

  componentWillMount() {
    if(this.state.gameArray.length === 0 ) {
      this.setState( (prevState) => ({
        gameArray: makeArray(this.state.cols, this.state.rows, false),
      }))
    }

    if(this.state.isRunning === true) {
      this.running = setInterval(
        () => this.incrementGeneration(),
        this.state.speed
      ) 
    }  
  }

  componentWillUnmount() {
    if(this.state.isRunning === false) { 
      clearInterval(this.running);
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
          running={this.state.isRunning}
        />
        <h2>Generation: {generation}</h2>
        <button onClick={() => this.newRandomGrid()} >
          Random
        </button>
        <button onClick={() => this.incrementGeneration()} >
          Increment
        </button>
        <button onClick={() => this.startGame()} >
          Start
        </button>
        <button onClick={() => this.stopGame()} >
          Stop
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
