import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const LoadingSpinner = (props) => {
    const { promiseInProgress } = usePromiseTracker({area: props.area});

    return (
        <div>
            {
                (promiseInProgress === true) ?
                    <div className="spin-background">
                        <div className="loader"></div>
                    </div>
                    :
                    null
            }
        </div>
    )
};

export default LoadingSpinner;