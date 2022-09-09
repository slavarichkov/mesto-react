import React, { useState, useEffect } from 'react';
import api from './../utils/Api';
import Card from '../components/Card';


function Main(props) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    const [cards, setCards] = useState([]);

    // запрос данных пользователя с сервера
    useEffect(() => {
        api.getUserInfo().then((data) => {
            setUserName(data.name);
            setUserDescription(data.about);
            setUserAvatar(data.avatar);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    //запрос карточек с сервера
    useEffect(() => {
        api.getImages().then((dataCards) => {
            setCards(dataCards);
        })
    }, [])

    

    return (
        <main>
            <section className="profile">
                <div className="profile__container">
                    <img className="profile__avatar" src={userAvatar} alt="Аватар"></img>
                    <button className="profile__avatar-edit-button" type="button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__profile-info">
                    <div className="profile__content">
                        <h1 className="profile__firstname">{userName}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__subtext">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {/* заготовка для изображения пользователя (карточки) */}
                {cards.map(card => {
                    return <Card key={card._id} id={card._id} name={card.name} src={card.link} likes={card.likes.length} onImageClick ={props.onCardClick} />
                })}
            </section>
        </main>
    )
}

export default Main;