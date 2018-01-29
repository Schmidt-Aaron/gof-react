import React, { Component } from 'react';
import './App.css';

//helper functions
const makeArray = (cols, rows, random) => {
  /** 
   * @random should a bolean
   * will fill the array with either 0 or 1  if set to true  
  **/

  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr.length; j++ ){
      !random 
        ? arr[i][j] = 0
        : arr[i][j] = ( Math.round( Math.random() )); 
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
      rows: 10,
      cols: 10,
      gameArray: [],
      isRunning: false,
      speed: 500,
        
    }
  }

  render() {
    const generation = this.state.generation;
    this.state.gameArray = makeArray(this.state.cols, this.state.rows, false);

    return (
      <div className="App">
        <div className="header">
          <h1>GOL-React</h1>
        </div>
        <Grid 
          game={this.state.gameArray}
        />
        <h2>Generation: {generation}</h2>
      </div>
    );
  }
} //end main

// does this need state => change into function?
class Grid extends Component {
  render() {
    const game = this.props.game;
    console.log(game);
    return (
      <div 
        className="grid"  
      >
      {game.map((e, i) => 
        <Row 
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
    const gameArray = this.props.rowArray;
    const index = this.props.index;
    return (
      <div>
        {gameArray.map((e,i) =>
          <Cell 
            index={`${index}_${i}`}
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
        className="box"
        alive="use props"
        key={this.props.index}
      >
      cell
      </div>
    );
  }
}

export default App;
