import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import ImageUploader from './components/ImageUploader';

class FacialRecognition extends React.Component {
    constructor(props) {
        super(props);
        // Creating an instance of Axios with all the configs.
        this.axios = Axios.create({
            baseURL: props.serviceDomain,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Binding functions.
        this.changeHandle = this.changeHandle.bind(this);
    }

    changeHandle(img) {
        // make a POST requests to the server.
        this.axios.post('/', {image: img}).then( (res) => {
            // Success
            alert('Receiving the response -> '+res.data);
        }).catch( (err) => {
            // Fail
            alert('Server communication error. '+err);
        });
    }

    render() {
        return(
            <div className = "facial-recognition">
                <ImageUploader onChange = {this.changeHandle}  />
            </div>
        );
    }
}
// Type checking.
FacialRecognition.propTypes = {
    serviceDomain: PropTypes.string.isRequired
};

export default FacialRecognition;