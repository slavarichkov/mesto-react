import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, isClose, onUpdateAvatar }) {

    const inputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    return (
        <PopupWithForm name='popup_avatar_redact'
            text='Обновить аватар'
            isOpen={isOpen}
            isClose={isClose}
            onSubmit = {handleSubmit}
            children={
                <input ref={inputRef} type="url" placeholder="Ссылка" className="popup__input popup__input_name_image"
                    name="link" id="ava-link"  required />
            }
        />
    )
}

export default EditAvatarPopup;