import React, {useState} from 'react';
import TouchableOpacity from 'react';

const VectorButton = ({ icon}) => {
    const [isPressed,setIsPressed]=useState(false) ;

  return (
    <TouchableOpacity onPress={() => console.log('')}>
        {icon}
    </TouchableOpacity>
  );
};

export default VectorButton;