import React, { Component } from 'react';
import './App.css';

//helper functions
const makeArray = (cols, rows, blank) => {
  /** 
   * @blank should a bolean
   * will fill the array with 0 values if set to true  
  **/

  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    !blank ? arr[i] = new Array(rows) : arr[i] = new Array(rows).fill(0);
  }
  return arr;
}

// const blankArr = (arr) => {
//   for(let i = 0; i < arr.length; i++) {
//     arr[i].fill(0);
//   } 
// }

class App extends Component {
  constructor(props) {
    super(props);
    

    this.state =  {
      generation: 0,
      isRunning: false,
      grid: [],
      next: [],
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

  componentDidMount() {
    if(this.state.grid.length === 0) {
      this.setState( (prevState) => ({
        grid: makeArray(30, 20, true)
      }))
    }
  }

  render() {
    const { 
      generation, 
      grid,
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
          grid={grid}
          />
        <h2> Generation: {generation}</h2>
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
      grid: this.props.grid,
    };
  }

  componentDidMount() {
    this.draw();
  }
  

  
  draw() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const gridToRender = this.props.grid;
    console.log(this.props);
    const resolution = 10;
    ctx.fillStyle = "red";
    
    for(var i = 0; i < gridToRender.length; i++)
    for(var j = 0; j < gridToRender[i].length; j++) {
      ctx.fillRect(i * resolution, j * resolution, resolution, resolution);
      
    }

  }
  
  render() {

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


export default App;
