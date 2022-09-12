import React from 'react';

function Input (props) {
    return (
        <input type={props.type} placeholder={props.nameInput} className="popup__input"
            name={props.nameInput} id={props.id} required />
    )
};

export default Input;