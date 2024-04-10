import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';

const StyledInput = styled.input`
  display: block;
  margin: 20px 0px;
  font-size: 20px;
  border: 1px solid lightblue;
`;

function useInput(defaultValue?: string) {
  const [value, setValue] = useState(defaultValue);
  function onChange(e: any) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange,
  };
}

function increment(num: string, base: number): string {
// Increment a number of any base
  if (num === "")
    return "1";
  let uni = num.charCodeAt(num.length - 1) - 55;
  if (uni >= 10) {
    if (uni + 1 >= base)
      return increment(num.slice(0, num.length - 1), base) + "0";
    else
      return num.slice(0, num.length - 1) + String.fromCharCode(uni + 56);
  }
  else if (Number(num.charAt(num.length - 1)) === 9) {
    if (base === 10)
      return String(Number(num) + 1);
    else
      return num.slice(0, num.length - 1) + "A";
  }
  else if (Number(num.charAt(num.length - 1)) + 1 >= base)
    return increment(num.slice(0, num.length - 1), base) + "0";
  else
    return num.slice(0, num.length - 1) + String(Number(num.charAt(num.length - 1)) + 1);
}

// Usage in App
function App() {
  function changeValue() {
    if (!(typeof number.value == "undefined") && !(typeof base.value == "undefined") && !(typeof baseto.value == "undefined")) {
      let num = "0";
      for (let i = 0; i < parseInt(number.value, Number(base.value)); i++) {
        num = increment(num, Number(baseto.value));
      }
      setValue(num);
    }
  }
  const number = useInput();
  const base = useInput();
  const baseto = useInput();
  const [value, setValue] = useState("");
  return (
    <div style={{margin: '50px'}}>
      <h3>Number: </h3>
      <StyledInput
        {...number}
        placeholder="Number"
      />
      <h3>Base: </h3>
      <StyledInput
        {...base}
        placeholder="Base"
      />
      <h3>To Base: </h3>
      <StyledInput
        {...baseto}
        placeholder="To Base"
      />
      <button onClick={changeValue}>Calculate</button>
      <h3>Value: {value}</h3>
    </div>
  );
}

export default App;
