import React from 'react';
import currentUserContext from '../contexts/CurrentUserContext';


function Card({ id, src, name, onImageClick, likes }) {

    const userInfo = React.useContext(currentUserContext);

    function handleImageClick() {
        onImageClick({ src: src, name: name });
    }

    return (
        <div className="work-piece">
            <div className="element" id={id}>
                <img className="element__maskgroup" src={src} alt={name} onClick={handleImageClick} />
                <div className="element__group">
                    <h2 className="element__title">{name}</h2>
                    <div>
                        <button className="element__like" type="button"></button>
                        <h2 className="element__like-sum">{likes}</h2>
                    </div>
                    <button className="element__button-delete"></button>
                </div>
            </div>
        </div>
    )
}
export default Card;
