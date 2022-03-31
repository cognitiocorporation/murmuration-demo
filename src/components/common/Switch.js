import React from 'react';
import './Switch.css';

const Switch = ({ isOn, handleToggle, onColor, myKey, title }) => {
  console.log(myKey)
  return (
    <div style={{display: 'flex', flex: 1}} key={myKey}>
      <div >
        <input
          checked={isOn}
          onChange={handleToggle}
          className="react-switch-checkbox"
          id={`react-switch-new`+myKey}
          type="checkbox"
        />
        <label
          style={{ background: isOn && onColor }}
          className="react-switch-label"
          htmlFor={`react-switch-new`+myKey}
        >
          <span className={`react-switch-button`} />
        </label>
      </div>
      
      <div className="my-auto ml-2">
         <p className="insideFont">{title}</p>
      </div>
     
    </div>
  );
};

export default Switch;