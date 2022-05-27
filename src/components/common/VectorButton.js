import React, {useState} from 'react';
import TouchableOpacity from 'react';

class VectorButton extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          selectionValue: '',
        }
        
  }

  render() {
    return (
      this.props.icon
    )
  }

}

export default VectorButton
