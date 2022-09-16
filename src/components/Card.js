import React from 'react';
import currentUserContext from '../contexts/CurrentUserContext';


function Card({ id, src, name, onImageClick, likes }) {

    const userInfo = React.useContext(currentUserContext);
    const isOwn = id === userInfo._id;
    const isLiked = likes.some(item => userInfo.id === item._id);

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
                        <button className={`element__like ${isLiked ? 'element__like_activeted' : ''}`} type="button"></button>
                        <h2 className="element__like-sum">{likes.length}</h2>
                    </div>
                    {isOwn ?
                        <button className="element__button-delete"></button>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}
export default Card;
