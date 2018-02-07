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
class GoL extends Component {
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
      updated: false,
    }

  }
  
  /**** app functions ****/
  //calculates cell neighbors 
  calculateNeighbors(gameArr, y, x) {
    let sum = 0;
    let cols = this.state.cols;
    let rows = this.state.rows;

    for (let i = -1; i < 2; i++) {
      for(let j = -1; j < 2; j++) {
        let col = (y + i + cols) % cols;
        let row = (x + j + rows) % rows;
        sum += gameArr[col][row]
      }
    }
    
    sum -= gameArr[y][x]
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

  toggleLife(num) {
    return num === 0 ?  num = 1 : num = 0;
  }

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
    if(this.state.updated === false) {
      setTimeout(() => {
        this.setState( (prevState) => ({
          gameArray: this.createNextGenGrid(prevState.gameArray),
          updated: true, 
          generation: prevState.generation += 1,
        })) 
      }, 200)
    }
  }

  startGame(){
    this.setState( (prevState) => ({
      isRunning: true,
    }))

    this.incrementGeneration();
  }
  
  stopGame(){
    this.setState( (prevState) => ({
      isRunning: false,
    }))
  }

  getCoords(id) {
    let newGameArray = this.state.gameArray;
    let coords = id.split('_');
    let x = +coords[0];
    let y = +coords[1];
    newGameArray[x][y] = this.toggleLife(newGameArray[x][y])
    //console.log(this.calculateNeighbors(newGameArray, x, y ))
    this.setState( (prevState) => ({
      gameArray: newGameArray
    }))

    console.log( this.calculateNeighbors(newGameArray, x, y))
  }

  
  componentDidUpdate() {
    if(this.state.updated === true ) {
      this.setState( (prevState) => ({
        updated: false,
      }))
    }
  }

  componentWillMount() {
    //creates initial grid
    if(this.state.gameArray.length === 0 ) {
      this.setState( (prevState) => ({
        gameArray: makeArray(this.state.cols, this.state.rows, false),
      }))
    }
  }
  
  render() { 
    const generation = this.state.generation;

    return (
      <div className="container">
        <Grid 
          game={this.state.gameArray}
          getCoords={this.getCoords.bind(this)}
        />  
        <Counter generation={generation} />
        <Controls
          newRandomGrid={this.newRandomGrid.bind(this)}
          newBlankGrid={this.newBlankGrid.bind(this)}
          stopGame={this.stopGame.bind(this)}
          startGame={this.startGame.bind(this)}
          incrementGeneration={this.incrementGeneration.bind(this)}
        />
      </div>
    );
  }
} //end main

class Grid extends Component {

  passClick(id) {
    this.props.getCoords(id);
  }

  render() {
    const game = this.props.game;
    return (
      <div 
        className="grid"  
      >
      {
      game.map((e, i) => 
        e.map((el, j) =>
          <Box 
            alive={game[i][j]}
            key={`${i}_${j}`}
            id={`${i}_${j}`}
            handleClick={this.passClick.bind(this)}
          />
        )    
      )
      }
      </div>
    );
  }
}

class Box extends Component {

  boxClick(id) {
    this.props.handleClick(id)
  }

  render(){
    return (
      <div
        className={this.props.alive === 1 ? "box alive" : "box"}
        onClick={this.boxClick.bind(this, this.props.id)}
      />

    );
  }
}

const Header = () => (
  <div className="header">
    <h1>Conway's GoL in React</h1>
  </div>
)

const Counter = (props) => (
  <h2>Generation: {props.generation}</h2>
)

class Controls extends Component {
  
  randomGridClick(event) {
    this.props.newRandomGrid();
  }

  blankGridClick(event) {
    this.props.newBlankGrid();
  }

  incrementClick(event) {
    this.props.incrementGeneration();
  }
  
  startClick(event) {
    this.props.startGame();
  }
  
  stopClick(event) {
    this.props.stopGame();
  }

  render(){
    return (
      <div className="controls">
        <button onClick={this.randomGridClick.bind(this)} >
          Random
        </button>
        <button onClick={this.blankGridClick.bind(this)} >
          Blank
        </button>
        <button onClick={this.incrementClick.bind(this)} >
          Increment
        </button>
        <button onClick={this.startClick.bind(this)} >
          Start
        </button>
        <button onClick={this.stopClick.bind(this)} >
          Stop
        </button>
      </div>
    );
  }
}

class App extends Component {
  render(){
    return (
      <div className="App">
        <Header />
        <GoL />
      </div>
    );
  }
}

export default App;
