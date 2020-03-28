import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './constant';
import './App.css';

const App = () => {
  const mySocket = new WebSocket('wss://sheltered-falls-30931.herokuapp.com/', ['json']);
  const [ input1, setInput1 ] = useState('');
  const [ input2, setInput2 ] = useState('');

  useEffect(() => {
    mySocket.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    mySocket.onmessage = function (event) {
      console.log('react websocket data? ', {
        data: event.data,
      });
    };
  }, []);

  const handleSum = async () => {
    const result = await axios.post(`${API_URL}/add`, {
      payload: "1,2"
    });

    console.log('res? ', result);
  }

  const handleDivision = async () => {
    const result = await axios.post(`${API_URL}/divide`, {
      payload: `${input1},${input2}`
    });

    console.log('division res? ', result);
  }

  const handleInput1Change = (e) => {
    setInput1(e.target.value)
  }

  const handleInput2Change = (e) => {
    setInput2(e.target.value)
  }

  return (
    <div className="App">
      <div className="App-header">
        <h2 className="heading" >Math Operations</h2>
      </div>
      <div className="App-body">
        <div className="row-1">
          <input 
            type="text"
            className="input"
            placeholder="0"
            value={ input1 }
            onChange={ handleInput1Change }
          />

          <input 
            type="text"
            className="input"
            placeholder="0"
            value={ input2 }
            onChange={ handleInput2Change }
          />
          <div className="output">
            <p className="output-p">123</p>
          </div>
        </div>
        <div className="row-2">
          <button className="button" onClick={ handleSum } >+</button>
          <button className="button" >-</button>
          <button className="button" >x</button>
          <button className="button" onClick={ handleDivision } >/</button>
        </div>
      </div>
    </div>
  );
}

export default App;
