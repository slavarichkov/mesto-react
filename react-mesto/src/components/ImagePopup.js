import React from 'react';

function ImagePopup(props) {

    return (
        <div className={`popup popup_image_scale ${props.isOpen} popup_overlay`}>
            <div className="popup__image-content">
                <button className="popup__close-button popup__close-button_image_scale" type="button" onClick = {props.onClose}/>
                <img className="popup__image-scale" src= {props.link} alt={props.name} />
                <p className="popup__image-title">{props.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;