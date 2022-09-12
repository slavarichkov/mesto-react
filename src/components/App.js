import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlace] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});

  // функции открытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen('popup_open')
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen('popup_open');
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen('popup_open');
  }

  function handleDeletePlaceClick() {
    setIsDeletePlace('popup_open');
  }

  function handleCardClick(src, name) {
    setIsImagePopupOpened('popup_open');
    setSelectedCard({ src, name }); //пробросить данные открытой карточки из Card для добавления в попап масштабируемого изображения
  }

  // функция закрытия попапов
  function closeAllPopups(e) {
    e.preventDefault();
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlace(false);
    setIsImagePopupOpened(null);
  }

  function handleCloseAllPopupsEcs(e) {
    if (e.key === "Escape") {
      closeAllPopups(e);
    }
  }

  function handleCloseAllPopupsClickOverlay(e) {
    if (e.target.classList.contains('popup_overlay')) {
      closeAllPopups(e);
    }
  }

  useEffect(() => {
    if (
      [isEditAvatarPopupOpen, isAddPlacePopupOpen, isDeletePlacePopupOpen, isEditProfilePopupOpen].includes === false
      || isImagePopupOpened !== null
    ) {
      document.addEventListener('click', handleCloseAllPopupsClickOverlay);
      document.addEventListener('keydown', handleCloseAllPopupsEcs);
    }
    else {
      return () => {
        document.removeEventListener('click', handleCloseAllPopupsClickOverlay);
        document.removeEventListener('keydown', handleCloseAllPopupsEcs);
      }
    }
  }, [isEditAvatarPopupOpen, isAddPlacePopupOpen, isEditProfilePopupOpen, isDeletePlacePopupOpen, isImagePopupOpened]);

  return (
    <div className="page">
      <Header />
      <Main onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick} />
      {/**  <!--Попап Редактирование профиля --> */}
      <PopupWithForm name='popup_user_input'
        text='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        isClose={closeAllPopups}
        children={
          <>
            <input type="text" placeholder="Имя" className="popup__input popup__input_field_firstname"
              name="firstname" id="username-input" minLength="2" maxLength="40" required />
            <input type="text" placeholder="Профессия" className="popup__input"
              name="profession" id="profession-input" minLength="2" maxLength="200" required />
          </>
        }
      />
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
      {/** <!-- Попап подтверждения удаления карточки --> */}
      <PopupWithForm name='popup_card_remove'
        text='Вы уверены?'
        isOpen={isDeletePlacePopupOpen}
        isClose={closeAllPopups} />
      {/** <!--Попап форма редактирования аватара --> */}
      <PopupWithForm name='popup_avatar_redact'
        text='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        isClose={closeAllPopups}
        children={
          <input type="url" placeholder="Ссылка" className="popup__input popup__input_name_image"
            name="link" id="ava-link" required />
        }
      />
      {/** <!--Попап Масштабированное изображение --> */}
      < ImagePopup isOpen={isImagePopupOpened}
        name={selectedCard.name}
        link={selectedCard.src}
        onClose={closeAllPopups} />
      <Footer />
    </div>
  );
}

export default App;