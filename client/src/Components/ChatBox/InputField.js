import React from 'react';

const InputField = () => {
    return (
        <div className='input-container'>
            <input type="text" placeholder="Type a message..."/>
            <button>Send</button>
        </div>
    );
}

export default InputField;