import React from "react";
import { withTranslation } from 'react-i18next';

class CustomFileUpload extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      fileName: '',
   };

    this.selectFile = this.selectFile.bind(this);
  }

  selectFile(file) {
    this.props.onFileSelect(file[0].name);
  }
  
  onChange = e => {
    switch (e.target.name) {
      // Updated this
      case 'selectedFile':
        if(e.target.files.length > 0) {
            // Accessed .name from file 
            this.setState({ fileName: e.target.files[0].name });
            this.props.onFileSelect(e.target.files[0]);
        }
      break;
      default:
        this.setState({ [e.target.name]: e.target.value });
     }
  };

  render() {
    // Translation
    const { t, myFile } = this.props;
    const storageLanguage = localStorage.getItem('language');

    const { fileName } = this.state;
    let file = null;
 
    file = myFile 
       ? ( <span>{myFile.name}</span>) 
       : ( <span>{t('CHOOSE_FILE')}</span> );

    return(
    <div className="custom-file mb-3">
      <input name="selectedFile" type="file" className="custom-file-input" id="customFile" onChange={ (event) => this.onChange(event) }/>
        <label className="custom-file-label" htmlFor="customFile">
          {file}
        </label>
      </div>
    )
  }
}

export default withTranslation()(CustomFileUpload);
