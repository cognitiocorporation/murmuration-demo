import React from 'react';
import './Switch.css';

const Switch = ({ isOn, handleToggle, onColor, myKey }) => {
  console.log(myKey)
  return (
    <div key={myKey}>
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
  );
};

export default Switch;