import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, isClose, onAddPlace }) {

    // Стейты, в которых содержятся значения инпута
    const [nameImage, setNameImage] = useState('');
    const [link, setLink] = useState('');

    //передать данные карточки из инпутов
    function handleChangeNameImage(e) {
        setNameImage(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    //отправка на сервер 
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            image_title: nameImage,
            link: link,
        });
        setNameImage('');
        setLink('');
    }

    //очистить инпуты после сабмита
    useEffect(() => {
        setNameImage('');
        setLink('');
    }, [isOpen])

    return (
        <PopupWithForm name='popup_image_content'
            text='Новое место'
            isOpen={isOpen}
            isClose={isClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input value={nameImage} type="text" placeholder="Название" className="popup__input popup__input_name_image"
                        name="image-title" id="input-image" minLength="2" maxLength="30" onChange={handleChangeNameImage} required />
                    <input value={link} type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_link_image"
                        name="link" id="profession-input" onChange={handleChangeLink} required />
                </>
            }
        />
    )
}

export default AddPlacePopup; 
