import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, isClose}) {

    return (
        <PopupWithForm name='popup_image_content'
            text='Новое место'
            isOpen={isOpen}
            isClose={isClose}
            children={
                <>
                    <input type="text" placeholder="Название" className="popup__input popup__input_name_image"
                        name="image-title" id="input-image" minLength="2" maxLength="30" required />
                    <input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_link_image"
                        name="link" id="profession-input" required />
                </>
            }
        />
    )
}

export default AddPlacePopup; 
