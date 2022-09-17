import React from 'react';
import PopupWithForm from './PopupWithForm';


//редактирование профиля
function EditProfilePopup({ isOpen, isClose }) {

    return (
        < PopupWithForm name='popup_user_input'
            text='Редактировать профиль'
            isOpen={isOpen}
            isClose={isClose}
            children={
                <>
                    <input type="text" placeholder="Имя" className="popup__input popup__input_field_firstname"
                        name="firstname" id="username-input" minLength="2" maxLength="40" required />
                    <input type="text" placeholder="Профессия" className="popup__input"
                        name="profession" id="profession-input" minLength="2" maxLength="200" required />
                </>
            }
        />
    )

}

export default EditProfilePopup;
