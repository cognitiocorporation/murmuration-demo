import React from 'react';
import './SmallSwitch.css';

const SmallSwitch = ({ isOn, handleToggle, onColor, myKey, title }) => {
  console.log(myKey)
  return (
    <div style={{flex: 1}} key={myKey}>
      <div style={{display: 'flex', alignItems: 'center', minWidth: 50}}>
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
      
      {/* <div className="my-auto ml-2">
         <p className="insideFont">{title}</p>
      </div> */}
     
    </div>
  );
};

export default SmallSwitch;