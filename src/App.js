import './App.css';
import React, {useState} from 'react';

function App() {
  // state code
  const [color, setColor] = useState('#000000');
  function changeColor(event)  {
    let color = event.target.value;
    setColor(color)
  }
  const [selectedBrush, setSelectedBrush] = useState('regular');
  let changeSelected = (event) =>  {
    setSelectedBrush(event.target.value);
    console.log(selectedBrush);
  }
  const [sliderValue, setSliderValue] = useState(16);
  let adjustSlider = (event) =>  {
    setSliderValue(event.target.value);
    clear();
  };
  const [mouseIsDown, setMouseIsDown] = useState(false);
  document.body.onmousedown = () =>  {
    setMouseIsDown(true);
  }
  document.body.onmouseup = () =>  {
    setMouseIsDown(false);
  }

  // for clearing grid
  function clear()  {
    console.log('kys')
    let cells = document.querySelectorAll('.grid-cell');
    console.log(cells)
    for (let i = 0; i < cells.length; i++)  {
      cells[i].style = "background-color: white; height: "+(480/sliderValue)+"px; width: "+(480/sliderValue)+"px;";
    }
  }

  return (
    <div className="main">
        <div className="input-panel">
            <input className="color-picker" type="color" defaultValue={color} onChange={changeColor}/>
            <RadioContainer handleChange={changeSelected}/>
            <input className="clear" type="button" value="Clear" onClick={clear}/>
            <br/>
            <Slider value={sliderValue} handleChange={adjustSlider}/>
        </div>
        <Grid squares={sliderValue*sliderValue} size={480/sliderValue} selectedBrush={selectedBrush} color={color} mouseIsDown={mouseIsDown}/>
    </div>
  );
}

class RadioContainer extends React.Component  {
  render()  {
    return <div className="radio-container">
      <div>
          <input defaultChecked="true" type="radio" className='brushes' name="brushes" id="regular" value="regular" onChange={this.props.handleChange}/>
          <label htmlFor="regular">Regular</label>
      </div>
      <div>
          <input type="radio" className='brushes' name="brushes" id="rainbow" value="rainbow" onChange={this.props.handleChange}/>
          <label htmlFor="rainbow">Rainbow</label>
      </div>
      <div>
          <input type="radio" className='brushes' name="brushes" id="eraser" value="eraser" onChange={this.props.handleChange}/>
          <label htmlFor="eraser">Eraser</label>
      </div>
  </div>
  };
}

class Slider extends React.Component {
  render()  {
    return <div className="slider-container">
      <input className="slider" type="range" defaultValue={this.props.value} onChange={this.props.handleChange} min="8" max="64" step="4"/>
      <div>
      <p className="slider-value">{this.props.value}x{this.props.value}</p>
      <p className="note">(changing grid size will clear your current work!)</p>
      </div>
    </div>;
  }
}

class Grid extends React.Component  {
  render()  {
    let componentList = [];
    for (let i = 0; i < this.props.squares; i++) {
      componentList.push(<Cell key={i} size={this.props.size} selectedBrush={this.props.selectedBrush} color={this.props.color}  mouseIsDown={this.props.mouseIsDown}/>);
    }
    return <div className='grid'>
      {componentList}
    </div>;
  }
}

class Cell extends React.Component  {
  generateRandomColor = () => {
    let hexadecimal = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color = color + hexadecimal.charAt(Math.floor(Math.random()*15)+1);
    }
    return color;
  }

  colorCell = (mouseEvent) => {
    if (mouseEvent.type === 'mouseover' && !this.props.mouseIsDown) return;
    if (this.props.selectedBrush === 'regular')    {
        mouseEvent.target.style = "background-color: "+this.props.color+"; height: "+this.props.size+"px; width: "+this.props.size+"px;";
    }
    if (this.props.selectedBrush === 'rainbow')   {
        mouseEvent.target.style = "background-color: "+this.generateRandomColor()+"; height: "+this.props.size+"px; width: "+this.props.size+"px;";
    }
    if (this.props.selectedBrush === 'eraser') {
        mouseEvent.target.style = "background-color: white; height: "+this.props.size+"px; width: "+this.props.size+"px;";
    }
  }

  render()  {
    return <div
      className='grid-cell'
      style=
        {
          {
            backgroundColor: "white",
            height: `${this.props.size}px`,
            width: `${this.props.size}px`
          }
        }
      onMouseOver={this.colorCell}
      onMouseDown={this.colorCell}
      >
      </div>;
  }
}

export default App;
