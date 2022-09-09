import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

  // функции открытия попапов
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen('popup_open')
  }

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState('');


  function handleEditProfileClick() {
    setEditProfilePopupOpen('popup_open');
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState('');

  function handleAddPlaceClick() {
    setAddPlacePopupOpen('popup_open');
  }

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState('');

  function handleDeletePlaceClick() {
    setDeletePlace('popup_open');
  }

  const [isDeletePlacePopupOpen, setDeletePlace] = useState('');

  function handleCardClick(props) {
    setSelectedCard('popup_open');
    setPropsCard(props);
  }

  const [selectedCard, setSelectedCard] = useState('');
  const [propsCard, setPropsCard] = useState({});

  // функция закрытия попапов
  function closeAllPopups(e) {
    e.preventDefault();
    setEditProfilePopupOpen('');
    setEditAvatarPopupOpen('');
    setAddPlacePopupOpen('');
    setDeletePlace('');
    setSelectedCard('');
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
    document.addEventListener('click', handleCloseAllPopupsClickOverlay);
    document.addEventListener('keydown', handleCloseAllPopupsEcs);
  }, [isEditAvatarPopupOpen, isAddPlacePopupOpen, isEditProfilePopupOpen, isDeletePlacePopupOpen, selectedCard]);

  return (
    <div className="page">
      <Header />
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
      <Footer />
      {/* <!--Попап Редактирование профиля --> */}
      <PopupWithForm name='popup_user_input' text='Редактировать профиль' isOpen={isEditProfilePopupOpen} isClose={closeAllPopups} nameInput={'Введите Имя'} nameSubInput={'Введите профессию'} />
      {/* <!--Попап добавление изображений пользователем --> */}
      <PopupWithForm name='popup_image_content' text='Новое место' isOpen={isAddPlacePopupOpen} isClose={closeAllPopups} nameInput={'Введите название'} nameSubInput={'Введите ссылку на изображение'} />
      {/* <!-- Попап подтверждения удаления карточки --> */}
      <PopupWithForm name='popup_card_remove' text='Вы уверены?' isOpen={isDeletePlacePopupOpen} isClose={closeAllPopups} />
      {/* <!--Попап форма редактирования аватара --> */}
      <PopupWithForm name='popup_avatar_redact' text='Обновить аватар' isOpen={isEditAvatarPopupOpen} isClose={closeAllPopups} nameSubInput={'Введите ссылку на изображение'} />
      {/* <!--Попап Масштабированное изображение --> */}
      <ImagePopup isOpen={selectedCard} name={propsCard.name} link={propsCard.src} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
