import React, { Component } from 'react';
import './App.css';

//helper functions
const makeArray = (cols, rows, random) => {
  /** 
   * @blank should a bolean
   * will fill the array with 0 values if set to true  
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

// const randArray = (cols, rows) => {
//   let arr = [];

//   for(var i = 0; i < arr.cols; i++) {
//     for(var j = 0; j < arr[i].rows; j++) {
//     arr[i][j] = Math.round(Math.random());
//     }
//   }

//   return arr;
// }

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state =  {
      generation: 0,
      isRunning: false,
    }

    //if adding functions follow this template
    //this.functionName = this.functionName.bind(this);
    this.incrementGeneration = this.incrementGeneration.bind(this);
    //this.randomGrid = this.randomGrid.bind(this);
  }
  //then add function here, or inside applicable component
  //component functions
  incrementGeneration() {
   this.setState( (prevState) => ({
     generation: prevState.generation + 1,
   })) 
  }

  // 1. setup initial grid here
  // 2. update state.grid with initial grid
  // 3. pass state to canvasGrid Component
  
  render() {
    const { 
      generation, 
    } = this.state;
    
    
    return (
      <div className="App">
        <header>
          <h1 className="App-title">Conway's Game of Life</h1>
        </header>
        {/* <Grid
          gridX={gridX}
          gridY={gridY} 
        /> */}
          <CanvasGrid 
          />
        <h2> Generation: {generation}</h2>
        <button 
          onClick={() => this.incrementGeneration()}
          className="button"
          >
        Random
        </button>
        <button 
          onClick={() => this.incrementGeneration()}
          className="button"
          >
        Next Gen
        </button>
      </div>
    );
  }
}

class CanvasGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      next: [],
      resolution: 20,

    };
    
    this.blankGrid = this.blankGrid.bind(this);
    
  }

  blankGrid() {
    if(this.state.length === 0) {
      this.setState( (prevState) => ({
        grid: makeArray(30, 20, true)
      }))
    }
  }
  
  
  // initRandom() {
  //   this.setState( (prevState) => ({
  //     grid: randArray(30, 20)
  //   }))  
  // }
  
draw(gridArray) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    const resolution = this.state.resolution;
    ctx.fillStyle = "red";
    for(var i = 0; i < gridArray.length; i++) {
      for(var j = 0; j < gridArray[i].length; j++) {
        let y = j * resolution;
        let x = i * resolution;

        if(gridArray[i][j] === 1 ){
          ctx.fillRect(x, y, resolution, resolution);
        }
        
        ctx.moveTo(x, y);
        ctx.lineTo(x + resolution , y);
        ctx.lineTo(x + resolution, y + resolution);
        ctx.lineTo(x, y + resolution);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "black";
        ctx.stroke();    
      }
    }
  } 

  componentDidMount() {
    this.draw(makeArray(30, 20, true));
  }

  render() { 
    this.blankGrid();   
    return (
      <canvas 
      id="grid" 
      className="grid"
      height={400}
      width={600}
      style={{border: 'solid 5pt orange'}}
      ref="canvas"
      >
      Oh noes... the grid isn't loading
      </canvas>
    
  );
  
}


// class Box extends Component {
  //   constructor(props) {
//     super(props);

//     this.state = { alive: false };

//     this.selectCell = this.selectCell.bind(this);
//   }
  
//   selectCell() {
//     this.state.alive 
//     ? this.setState({ alive: false })
//     : this.setState({ alive: true })
//   }

//   render(){

//     const {
//       xPos,
//       yPos,
//       cellID,
//       alive,
//     } = this.props;

//     return ( 
//       <div
//         id={cellID}
//         className={ this.state.alive ? "box on" : "box"}
//         xpos={xPos}
//         ypos={yPos}
//         onClick={ () => this.selectCell() }
//       />
//     );
//   }

// }

// class Grid extends Component {
//   render() {
//     const  { rows, cols } = this.props;   
//     const width = rows * 14;
//     let gridArr = [];

//     for ( let i = 0; i < cols; i++ ) {
//       for( let j = 0; j < rows; j++ ){
//         let cellID = `${i}_${j}`;
        
//         gridArr.push(
//           <Box
//             key={cellID}
//             cellID={cellID}  
//             xPos={i}
//             yPos={j}
//           />
//         )
//       }
//     }

//     return (
//       <div 
//         className="grid"
//         style={{width: width}}
//       >
//         {gridArr}
//       </div>
//     );
//   }
// }
}

export default App;
