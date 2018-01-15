import React, { Component } from 'react';
import './App.css';

//helper functions
const makeArray = (cols, rows, random) => {
  /** 
   * @blank should a bolean
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

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state =  {
      generation: 0,
      isRunning: false,
      gridArray: [],
      resolution: 20,

    }
    
    //if adding functions follow this template
    //this.functionName = this.functionName.bind(this);
    this.incrementGeneration = this.incrementGeneration.bind(this);
    this.blankGrid = this.blankGrid.bind(this);
    this.randomGrid = this.randomGrid.bind(this);
    //this.randomGrid = this.randomGrid.bind(this);
  }
  //then add function here, or inside applicable component
  //component functions
  
  // next generation
  // add rerender function call once completed 
  incrementGeneration() {
    let nextGeneration = this.createNextGenGrid(this.state.gridArray);
// console.log(this.state.gridArray)
   this.setState( (prevState) => ({
     generation: prevState.generation + 1,
     gridArray: nextGeneration,
   })) 
  }

  // calculate the neighbors helpful function
  // give it the grid and the x + y coordinates
  // returns interger 0-8
  calculateNeighbors(gridArr, x, y) {
    let sum = 0;
    let cols = 30;
    let rows = 20;
    for (let i = -1; i < 2; i++) {
      for(let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += gridArr[col][row]
      }
    }

    sum -= gridArr[x][y]
    return sum;
  }

  // function that returns next generation gridArray
  // input gridArray
  // returns new grid
  createNextGenGrid(gridArr) {
    console.log(gridArr);
    let next = gridArr;
    for(let i = 0; i < gridArr.length; i++){
      for(let j = 0; j < gridArr.length; j++){
        let cell = gridArr[i][j];
        let neighbors = this.calculateNeighbors(gridArr, i, j);

        if(cell === 0 && neighbors === 3) {
          next[i][j] = 1;
        } else if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = cell;
        }
      }
    }

    return next;
  }

  //creates new gridArray filled with 0's
  blankGrid() {
    this.setState( (prevState) => ({
      gridArray: makeArray(30, 20),
    }))
  }
  
  //creates a new random gridArray
  randomGrid() {
    this.setState( (prevState) => ({
      gridArray: makeArray(30, 20, true),
    }))
  }
  
  // 1. setup initial grid here
  // 2. update state.grid with initial grid
  // 3. pass state to canvasGrid Component
  
  render() {
    if(this.state.gridArray.length === 0) {
      this.blankGrid();
    }
    const { 
      generation,
      gridArray,
      resolution, 
    } = this.state;
    
    return (
      <div className="App">
        <header>
          <h1 className="App-title">Conway's Game of Life</h1>
        </header>
          <CanvasGrid
            resolution={resolution}
            gridArray={gridArray} 
          />
        <h2> Generation: {generation}</h2>
        <button 
          onClick={() => this.randomGrid()}
          className="button"
          >
        Random
        </button>
        <button 
          onClick={() => this.blankGrid()}
          className="button"
          >
        Blank
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
      grid: this.props.gridArray,
      resolution: this.props.resolution,
    };
  }

  makeCanvas(width = 600, height = 400) {
    let el = document.createElement("canvas");
    el.id = "grid";
    el.setAttribute("className", "grid");
    el.setAttribute("height", height);
    el.setAttribute("width", width);
    el.setAttribute("ref", "canvas");
    el.setAttribute("style", "border: 'solid 5pt #673ab7'");
    console.log(el);
    document.getElementById("canvasDiv").appendChild(el);
  }
  
  draw(gridArray) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    const resolution = this.state.resolution;
    ctx.clearRect(0, 0, 600, 400);
    ctx.fillStyle = "#4caf50";
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
    // this.draw(makeArray(30, 20, true)); /* draws a new random grid */
    //this.draw(this.props.gridArray)
    //console.log("componentDidMount")
    //console.log("props at didMount" + this.props.gridArray); 
    //this.makeCanvas();
  }
  
  componentDidUpdate() {
    if(this.props.gridArray) {
      this.draw(this.props.gridArray)
    }   
  }

  render() {
    console.log("render call"); 
    //console.log("props at render" + this.props.gridArray); 
    //console.log(this.props.gridArray)
    return (

    // <div ref="canvasDiv">
    // {/* insert our canvas here */}
    // </div>
      <canvas 
      id="grid" 
      className="grid"
      height={400}
      width={600}
      style={{border: 'solid 5pt #673ab7'}}
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
