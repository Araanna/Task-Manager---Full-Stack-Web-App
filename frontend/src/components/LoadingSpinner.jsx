import React from 'react';
import '../styles/App.css'; // Ensure styles are imported if we add specific spinner styles

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center p-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );
};

export default LoadingSpinner;
