import React from 'react';

/*
    Get all information and render in a table.
 */
const renderInformation = props => {
    // Map all faces to render the information
    return props.data.images[0].faces.map( (face, idx) => {
        return (
            <tr key={idx}>
                <td>Face {idx}</td>
                <td>{face.gender.gender}({Math.floor(face.gender.score * 100)}%)</td>
                <td>{face.age.min} - {face.age.max}({Math.floor(face.age.score * 100)}%)</td>
            </tr>
        );
    });
}

const FaceInformation = props => {
    // If there is no data, render nothing.
    if(!props.data)
        return null;
    // Render the information in a table.
    return (
        <div>
            <table className="face-info">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                </tr>
                    {renderInformation(props)}
                </tbody>
            </table>
        </div>
    );
}

export default FaceInformation;