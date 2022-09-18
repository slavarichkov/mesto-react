import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import currentUserContext from '../contexts/CurrentUserContext';


//редактирование профиля
function EditProfilePopup({ isOpen, isClose, onUpdateUser }) {

    //данные юзера в стейт
    const currentUser = useContext(currentUserContext);
    console.log(currentUser);

    // Стейты, в которых содержятся значения инпута
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    //передать данные юзера в инпуты
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser])



    // Обработчики изменения инпута - обновляет стейт
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    //отправка на сервер 
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        < PopupWithForm name='popup_user_input'
            text='Редактировать профиль'
            isOpen={isOpen}
            isClose={isClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input type="text" placeholder="Имя" className="popup__input popup__input_field_firstname"
                        name="firstname" id="username-input" minLength="2" maxLength="40" required
                        value={name || ''} onChange={handleChangeName} />
                    <input type="text" placeholder="Профессия" className="popup__input"
                        name="profession" id="profession-input" minLength="2" maxLength="200" required
                        value={description || ''} onChange={handleChangeDescription} />
                </>
            }
        />
    )

}

export default EditProfilePopup;
