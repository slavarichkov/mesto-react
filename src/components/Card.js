import React from 'react';

function Card(props) {

    function handleClick() {
        props.onImageClick(props);
    }

    return (
        <div className="work-piece">
            <div className="element" id={props.id}>
                <img className="element__maskgroup" src={props.src} alt={props.name} onClick={handleClick} />
                <div className="element__group">
                    <h2 className="element__title">{props.name}</h2>
                    <div>
                        <button className="element__like" type="button"></button>
                        <h2 className="element__like-sum">{props.likes}</h2>
                    </div>
                    <button className="element__button-delete"></button>
                </div>
            </div>
        </div>
    )
}

export default Card;