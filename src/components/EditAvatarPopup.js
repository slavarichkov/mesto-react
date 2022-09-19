import React, { useState, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, isClose, onUpdateAvatar }) {

    const inputRef = useRef();
    const [link, setLink] = useState('');

    function handleChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    //очистить инпуты после сабмита
    useEffect(() => {
        setLink('');
    }, [isOpen])

    return (
        <PopupWithForm name='popup_avatar_redact'
            text='Обновить аватар'
            isOpen={isOpen}
            isClose={isClose}
            onSubmit={handleSubmit}
            children={
                <input value={link} ref={inputRef} type="url" placeholder="Ссылка" className="popup__input popup__input_name_image"
                    name="link" id="ava-link" onChange={handleChange} required />
            }
        />
    )
}

export default EditAvatarPopup;