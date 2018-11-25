import React from 'react';

class ImageUploader extends React.Component {

    constructor(props) {
        super(props);
        // Initializing the state
        this.state = {
            img: ''
        };
        // Creating the ref
        this.fileLoader = React.createRef();
        // Binding functions
        this.changeFileHandle = this.changeFileHandle.bind(this);
    }

    changeFileHandle(ev) {
        // Get all the uploaded files.
        let files = ev.target.files;
        if(files != undefined && files.length > 0) {
            let fileReader = new FileReader();
            // Wait for loading the file
            fileReader.onload = (e) => {
                this.setState({img: e.target.result});
                this.props.onChange(e.target.result);
            };
            // Start to read as Base64.
            fileReader.readAsDataURL(files[0]);
        }
    }

    renderFaces() {
        // Checking if the data is valid.
        if(this.props.data == undefined)
            return undefined;
        // Render the faces
        return (
            <div>
                {this.props.data.images[0].faces.map( (face, idx) => {
                    let style = face['face_location'];
                    return (
                        <div className = "face-box" key={idx} style = {style}>
                            <p className = "face-name">Face {idx}</p>
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        return(
            <div className = "image-uploader">
                <img src={this.state.img} alt = {'Facial recognition'} />
                <input type = {'file'} style = {{display: 'none'}} ref = {this.fileLoader} onChange = {this.changeFileHandle} />
                <button onClick = { () => this.fileLoader.current.click() }>Upload</button>
                {this.renderFaces()}
            </div>
        );
    }

}
// Default values to the properties.
ImageUploader.defaultProps = {
    onChange: () => {}
};

export default ImageUploader;