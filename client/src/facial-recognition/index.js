import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import ImageUploader from './components/ImageUploader';
import FaceInformation from './components/FaceInformation';
import './style.css';

class FacialRecognition extends React.Component {
    constructor(props) {
        super(props);
        // Initializing the state
        this.state = {
            response: undefined
        };
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
        // Before make the request, let's clear the response
        this.setState({response: undefined});
        // make a POST requests to the server.
        this.axios.post('/', {image: img}).then( (res) => {
            // Set the state with the response.
            this.setState({
                response: res.data
            });
        }).catch( (err) => {
            // Fail
            alert('Server communication error. '+err);
        });
    }

    render() {
        return(
            <div className = "facial-recognition">
                <ImageUploader onChange = {this.changeHandle} data = {this.state.response} />
                <FaceInformation data = {this.state.response} />
            </div>
        );
    }
}
// Type checking.
FacialRecognition.propTypes = {
    serviceDomain: PropTypes.string.isRequired
};

export default FacialRecognition;