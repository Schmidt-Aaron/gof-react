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
      rows: 10,
      cols: 10,
      gameArray: [],
      isRunning: false,
      speed: 1500,
      resolution: 15, //must equal cell height/width
      updated: false,
    }

  }
  
  /**** app functions ****/
  //calculates cell neighbors 
  calculateNeighbors(game, y, x) {
    let sum = 0;
    let cols = this.state.cols;
    let rows = this.state.rows;

    for (let i = -1; i < 2; i++) {
      for(let j = -1; j < 2; j++) {
        let col = (y + i + cols) % cols;
        let row = (x + j + rows) % rows;
        sum += game[col][row]
      }
    }
    
    sum -= game[y][x]
    return sum;
  }
  
  createNextGen(game) {
    console.log('create next gen');
    let nextGame = [];
    console.log(` next game arr is ${nextGame}`)

    for(let y = 0; y < game.length; y++){
      for(let x = 0; x < game[y].length; x++){
        let cell = game[y][x];
        let neighbors = this.calculateNeighbors(game, y, x);
        console.log(`y:${y} x:${x} cell value: ${cell} neighb: ${neighbors}`)
        //if (neighbors >= 1) {console.log(`cell: ${cell} y:${y} x:${x} neighb: ${neighbors}`)}
        
        //console.log(neighbors);
         if(cell === 0 && neighbors === 3) {
          //console.log(`y:${y} x:${x} val = 1`)
          nextGame[y][x] = 1; 
        } else if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
          //nextGameArr[y][x] = 0;
          //console.log(`y:${y} x:${x} val = 0`)
        } else {
          //nextGameArr[y][x] = cell;
          //console.log(`y:${y} x:${x} is unchanged`)
        }
      }
    }
    return game;
  }

  toggleLife(num) {
    return num === 0 ?  num = 1 : num = 0;
  }
  
  getCoords(id) {
    let newGameArray = this.state.gameArray;
    console.log(newGameArray);
    let coords = id.split('_');
    let y = +coords[0];
    let x = +coords[1];
    console.log(`y:${y} x:${x}`)
    // newGameArray[x][y] = this.toggleLife(newGameArray[y][x])
    //console.log(this.calculateNeighbors(newGameArray, y, x ))
    // this.setState( (prevState) => ({
    //   gameArray: newGameArray
    // }))

    console.log( this.calculateNeighbors(newGameArray, y, x))
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
    let blankArr = makeArray(this.state.cols, this.state.rows, false)
    blankArr[0][1] = 1; 
    blankArr[1][1] = 1; 
    blankArr[2][1] = 1; 
    this.setState( (prevState) => ({
      gameArray: blankArr,
      generation: 0,
      isRunning: false,
    })) 
  }

  // increases generation
  incrementGeneration() {
    let gameArr = this.state.gameArray;
    let nextGameArr = this.createNextGen(gameArr);
    console.log(` new game array = ${nextGameArr}`)
    this.setState( (prevState) => ({
      gameArray: nextGameArr,
      updated: true, 
      generation: prevState.generation += 1,
    })) 

    // if(this.state.updated === false) {
    //   setTimeout(() => {
    //   }, 200)
    // }
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


  
  componentDidUpdate() {
    // if(this.state.updated === true ) {
    //   this.setState( (prevState) => ({
    //     updated: false,
    //   }))
    // }
  }

  componentWillMount() {
    //creates initial grid
    if(this.state.gameArray.length === 0 ) {
      this.newBlankGrid();
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
