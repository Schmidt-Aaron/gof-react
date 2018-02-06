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
      speed: 1500,
      resolution: 15, //must equal cell height/width
      running: false,
    }
      
    //app function bindings
    this.newRandomGrid = this.newRandomGrid.bind(this);
    this.newBlankGrid = this.newBlankGrid.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.incrementGeneration = this.incrementGeneration.bind(this);
    this.getCoords = this.getCoords.bind(this);
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

  //startover with blank board
  newBlankGrid() {
    this.setState( (prevState) => ({
      gameArray: makeArray(this.state.cols, this.state.rows, false),
      generation: 0,
      isRunning: false,
    })) 
  }

  // increases generation
  incrementGeneration() {
    this.setState( (prevState) => ({
      gameArray: this.createNextGenGrid(prevState.gameArray), 
    }), this.genCounter) 
  }
  genCounter(){
    this.setState( (prevState) => ({ 
      generation: prevState.generation += 1,
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

  getCoords(e) {
    console.log('click');
    // let coords = this.props.index.split('_');
    // let x = coords[0];
    // let y = coords[1];
   // this.props.rowArray[y] = 1;

  }

  componentWillMount() {
    //creates initial grid
    if(this.state.gameArray.length === 0 ) {
      this.setState( (prevState) => ({
        gameArray: makeArray(this.state.cols, this.state.rows, false),
      }))
    }
    // let running = setInterval(
    //   this.incrementGeneration(), this.state.speed
    //   );
    
    // if(this.state.isRunning === true && this.state.running === false) {
    //   this.setState( (prevState) => ({
    //     running: running,
    //   }))
    // }

  }
  
  componentDidMount() {
  }
  
  componentWillUnmount() {
    // if( this.state.isRunning === false && this.state.running !== false ) { 
    //   clearInterval(this.state.running);
    //   this.setState( (prevState) => ({
    //     running: false,
    //   }))
    // }  
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
          onClick={(e) => this.getCoords(e)}
        />  
        <h2>Generation: {generation}</h2>
        <button onClick={() => this.newRandomGrid()} >
          Random
        </button>
        <button onClick={() => this.newBlankGrid()} >
          Blank
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
  // constructor(props) {
  //   super(props);

    
  // }

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
