import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [buttons, setButtons] = useState([
    {id: 192380123, text: "A"},
    {id: 193288213, text: "B"},
    {id: 983292833, text: "C"}
  ]);
  const [edit, setEdit] = useState({ key: 0 });
  const [editText, setEditText] = useState("");
  const [print, setPrint] = useState("");

  const handleSideClick = (id) => {
    const newId = Math.floor(Math.random() * 100000000);
    let tempArr = [...buttons];
    for(let i = 0; i < buttons.length; i++){
      if(buttons[i].id === id){
        tempArr.splice(i + 1, 0,  {id: newId, text: " "});
      }
    };
    setButtons(tempArr);
    setEdit({ key: newId });
  };

  const handleFirst = () => {
    const newId = Math.floor(Math.random() * 100000000);
    let tempArr = [...buttons];
    tempArr.splice(0, 0,  {id: newId, text: " "});
    setButtons(tempArr);
    setEdit({ key: newId});
  };

  const inputRef = useRef(null);

  const handleButtonDblClick = (id) => {
    setEdit({ key: id });
  };

  useEffect(()=>{
    inputRef.current?.focus();
  }, [edit.key]);

  const handleInput = (e) => {
    setEditText(e.target.value[0]);
  };

  const handleSubmit = (id) => {
    setButtons(buttons.map((button)=>{
      return button.id === id ? { ...button, text: editText} : button
    }));
    setEdit({ key: 0 });
    setEditText("");
  };

  const handleReset = () => {
    setButtons([
      {id: 192380123, text: "A"},
      {id: 193288213, text: "B"},
      {id: 983292833, text: "C"}
    ]);
    setEdit({ key: 0 });
    setEditText("");
    setPrint("");
  };

  const handlePrint = () => {
    let tempStr = buttons.reduce((acc, cur)=> {
      return acc + cur.text
    }, "");
    setPrint(tempStr);
  };

  return (
    <div className="App">
      { print && <h2>{print}</h2>}
      <div className="buttons">
      <div className="side" onClick={handleFirst}></div>
        {buttons.map((button)=>{
          return (
            <div key={button.id} className="button-container">
              {
                edit.key === button.id ? 
                <form onSubmit={()=>handleSubmit(button.id)}>
                  <input className="edit" ref={inputRef} type="text" value={editText} onChange={handleInput}/>
                </form>
                 :
                <div className="button" onDoubleClick={()=> handleButtonDblClick(button.id)}> 
                  <span>{button.text}</span>
                </div>
              }
              <div className="side" onClick={() => handleSideClick(button.id)}></div>
            </div>
          )
        })}
      </div>
      <div className="options">
        <button onClick={handleReset}>Reset</button>
        <button onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
}

export default App;
