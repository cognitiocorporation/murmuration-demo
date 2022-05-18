import React from 'react';
import './Switch.css';

const Switch = ({ isOn, handleToggle, onColor, myKey, title }) => {
  console.log(myKey)
  return (
    <div style={{display: 'flex', flex: 1}} key={myKey}>
      <div style={{height: 50}}>
        <input
          checked={isOn}
          onChange={handleToggle}
          className="react-switch-checkbox-big"
          id={`react-switch-new`+myKey}
          type="checkbox"
        />
        <label
          style={{ background: isOn && onColor }}
          className="react-switch-label-big"
          htmlFor={`react-switch-new`+myKey}
        >
          <span className={`react-switch-button-big`} />
        </label>
      </div>
      
      <div className="ml-2">
         <p className="insideFont">{title}</p>
      </div>
     
    </div>
  );
};

export default Switch;