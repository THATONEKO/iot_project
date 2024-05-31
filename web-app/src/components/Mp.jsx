import React from 'react';

const Mp = ({ imageUrl, altText }) => {
    return (
        <div>
            <img className=" rounded img-container mx-auto d-block" src={imageUrl} alt={altText} style={{ maxWidth: '100%', height: '50%' }} />
        </div>
    );
};

export default Mp;