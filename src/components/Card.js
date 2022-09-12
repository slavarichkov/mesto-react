import React from 'react';


function Card({ onImageClick, dataCards }) {

    return (
        dataCards.map(card => {
            let cardLink = card.link;
            let name = card.name;
            return (
                <div key={card._id} className="work-piece">
                    <div className="element" id={card._id}>
                        <img className="element__maskgroup" src={card.link} alt={card.name} onClick={() => { onImageClick(cardLink, name) }} />
                        <div className="element__group">
                            <h2 className="element__title">{card.name}</h2>
                            <div>
                                <button className="element__like" type="button"></button>
                                <h2 className="element__like-sum">{card.likes.length}</h2>
                            </div>
                            <button className="element__button-delete"></button>
                        </div>
                    </div>
                </div>)
        })
    )
}

export default Card;

// function handleImageClick() {
    //     onImageClick();
    // }

    // {cards.map(card => {
    //     return <Card key={card._id} id={card._id} name={card.name} src={card.link} likes={card.likes.length} onImageClick={props.onCardClick} />
    // })}

// return (
    //     <div className="work-piece">
    //         <div className="element" id={id}>
    //             <img className="element__maskgroup" src={src} alt={name} onClick={handleImageClick} />
    //             <div className="element__group">
    //                 <h2 className="element__title">{name}</h2>
    //                 <div>
    //                     <button className="element__like" type="button"></button>
    //                     <h2 className="element__like-sum">{likes}</h2>
    //                 </div>
    //                 <button className="element__button-delete"></button>
    //             </div>
    //         </div>
    //     </div>
    // )