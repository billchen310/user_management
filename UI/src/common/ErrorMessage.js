import React from 'react';

const ErrorMessage = (props) => {
    const {text} = props;

    return (
        <h6 className="error_message">{text}</h6>
    )
}

export default ErrorMessage;