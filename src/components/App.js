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

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlace] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

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
    api.sendUserInfo(data).then((dataUser) => { setCurrentUser(dataUser); setIsEditProfilePopupOpen(false) });

  }

  //пробросить данные для обновления аватара и отправки на сервер
  function handleUpdateAvatar(data) {
    api.sendAvatar(data).then((dataAvatar) => { setCurrentUser(dataAvatar); setIsEditAvatarPopupOpen(false) })
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



  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        {/**  <!--Попап Редактирование профиля --> */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} isClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        {/** <!--Попап добавление изображений пользователем --> */}
        <PopupWithForm name='popup_image_content'
          text='Новое место'
          isOpen={isAddPlacePopupOpen}
          isClose={closeAllPopups}
          children={
            <>
              <input type="text" placeholder="Название" className="popup__input popup__input_name_image"
                name="image-title" id="input-image" minLength="2" maxLength="30" required />
              <input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_link_image"
                name="link" id="profession-input" required />
            </>
          }
        />
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
