import React from 'react';

function PopupWithForm(props) {

    return (

        < div className={`popup ${props.name} popup_overlay ${props.isOpen}`
        }>
            <div className="popup__content">
                <button className="popup__close-button" type="button" onClick={props.isClose} />
                <form className="popup__form" name={`${props.name}`} onSubmit={props.isClose} noValidate>
                    <h2 className="popup__title">{props.text}</h2>
                    <div className="popup__set">
                        <div className="popup__input-conainer">
                            <input type="text" placeholder={props.nameInput} className="popup__input"
                                name="firstname" id="username-input" minLength="2" maxLength="40" required />
                            <span className="popup__text-error" id="error-firstname" />
                        </div>
                        <div className="popup__input-conainer">
                            <input type="text" placeholder={props.nameSubInput} className="popup__input"
                                name="profession" id="profession-input" minLength="2" maxLength="200" required />
                            <span className="popup__text-error" id="error-text" />
                        </div>
                        <button className="popup__button" type="submit">Сохранить</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default PopupWithForm;