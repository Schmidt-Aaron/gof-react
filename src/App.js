import React, { Component } from 'react';
import './App.css';


const makeArray = (cols, rows) => {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)
  }
  return arr;
}


class App extends Component {
  constructor(props) {
    super(props);
    

    this.state =  {
      generations: 0,
      isRunning: false,
    }

    //if adding functions follow this template
    //this.functionName = this.functionName.bind(this);
    this.incrementGeneration = this.incrementGeneration.bind(this);
    this.randomGrid = this.randomGrid.bind(this);
  }
  //then add function here, or inside applicable component
  
  incrementGeneration() {
   this.setState( (prevState) => ({
     generations: prevState.generations + 1,
   })) 
  }

  render() {
    const { 
      generations, 
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
          <CanvasGrid />
        <h2> Generation: {generations}</h2>
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

    this.state ={

    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, 50, 50);
  }
  
  render() {
    return (
      <canvas 
      id="grid" 
      className="grid"
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
