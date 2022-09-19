import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import currentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlace] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const userInfo = React.useContext(currentUserContext);

  // функции открытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletePlaceClick() {
    setIsDeletePlace(true);
  }

  function handleCardClick(dataCard) {
    setIsImagePopupOpened(true);
    setSelectedCard(dataCard); //пробросить данные открытой карточки из Card для добавления в попап масштабируемого изображения
  }

  // функция закрытия попапов
  function closeAllPopups(e) {
    e.preventDefault();
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlace(false);
    setIsImagePopupOpened(false);
  }

  //закрыть на Esc
  function handleCloseAllPopupsEcs(e) {
    if (e.key === "Escape") {
      closeAllPopups(e);
    }
  }

  //закрыть на оверлей
  function handleCloseAllPopupsClickOverlay(e) {
    if (e.target.classList.contains('popup_overlay')) {
      closeAllPopups(e);
    }
  }

  //пробросить данные из EditProfilePopup наверх для Апи и обновления стейта currentUser
  function handleUpdateUser(data) {
    api.sendUserInfo(data)
      .then((dataUser) => {
        setCurrentUser(dataUser);
        setIsEditProfilePopupOpen(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //пробросить данные для обновления аватара и отправки на сервер
  function handleUpdateAvatar(data) {
    api.sendAvatar(data)
      .then((dataAvatar) => {
        setCurrentUser(dataAvatar);
        setIsEditAvatarPopupOpen(false)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // запрос данных пользователя и карточек с сервера
  useEffect(() => {
    api.getUserInfo()
      .then((infoUser) => {
        setCurrentUser(infoUser);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  //Слушатели на закрытие попапов по Esc или клику на оверлей
  useEffect(() => {
    if (
      [isEditAvatarPopupOpen, isAddPlacePopupOpen, isDeletePlacePopupOpen, isEditProfilePopupOpen, isImagePopupOpened].includes(true)
    ) {
      document.addEventListener('click', handleCloseAllPopupsClickOverlay);
      document.addEventListener('keydown', handleCloseAllPopupsEcs);
      return () => {
        document.removeEventListener('click', handleCloseAllPopupsClickOverlay);
        document.removeEventListener('keydown', handleCloseAllPopupsEcs);
      }
    }
  }, [isEditAvatarPopupOpen, isAddPlacePopupOpen, isEditProfilePopupOpen, isDeletePlacePopupOpen, isImagePopupOpened]);

  // запрос данных пользователя и карточек с сервера
  useEffect(() => {
    api.getImages()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  // управлять лайком
  function handleCardLike(cardId, likes) {
    const isLiked = likes.some(i => i._id === userInfo._id); // проверяем, есть ли уже лайк на этой карточке
    //Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLike(cardId)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === cardId ? newCard : c))
            .catch((err) => {
              console.log(err);
            }) // данные карточки с лайком - стейт всех карточек -  мапом найти карточку с таким же айди, если нет, то новый стейт, если нет - не менять
        })
    } else {
      api.deleteLike(cardId)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === cardId ? newCard : c))
            .catch((err) => {
              console.log(err);
            })
        })
    }
  }

  //удаление карточки
  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then((newCard) => {
        setCards((cards) => cards.filter((c) => c._id !== cardId))
          .catch((err) => {
            console.log(err);
          })
      })
  }

  //отправка карточки на сервер и обновление стейта для отрисовки 
  function handleAddPlaceSubmit(data) {
    api.sendImages(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        {/**  <!--Попап Редактирование профиля --> */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} isClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        {/** <!--Попап добавление изображений(карточек) пользователем --> */}
        <AddPlacePopup isOpen={isAddPlacePopupOpen} isClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        {/** <!--Попап форма редактирования аватара --> */}
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        {/** <!-- Попап подтверждения удаления карточки --> */}
        <PopupWithForm name='popup_card_remove'
          text='Вы уверены?'
          isOpen={isDeletePlacePopupOpen}
          isClose={closeAllPopups} />
        {/** <!--Попап Масштабированное изображение --> */}
        < ImagePopup isOpen={isImagePopupOpened}
          name={selectedCard.name}
          link={selectedCard.src}
          onClose={closeAllPopups} />
      </div>
    </currentUserContext.Provider >
  );
}

export default App;
