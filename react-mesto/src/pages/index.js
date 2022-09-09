import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWhithImage from "../components/PopupWhithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import './index.css'; //импорт css для webpack
import { buttonEdit, firstNameInput, professionInput, imageAddButton, containerOfImages, config, buttonRedactAvatar } from "../utils/constants.js"; //импорт переменных

//получить айди юзера
let userId = '';

//класс Апи 
const api = new Api({
    host: 'https://mesto.nomoreparties.co/v1/cohort-47/',
    token: 'aa25b93c-b1f5-4136-8d21-3d760fe1b048'
});

const likeCard = (card) => {
    api.addLike(card.idImage)
        .then((res) => {
            card.drawLike(res.likes);
        })
        .catch((err) => {
            console.log(err);
        })

}

const deleteLike = (card) => {
    api.deleteLike(card.idImage)
        .then((res) => card.removeLike(res.likes))
        .catch((err) => {
            console.log(err);
        })
}

// управление увеличением изображения
const popupImageScaleControl = new PopupWhithImage('.popup_image_scale');
popupImageScaleControl.setEventListeners();

function controlScaleImage(name, link) {
    popupImageScaleControl.open(name, link);
}

//Попап редактирования аватара (изображения юзера) --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const popupUserSendAvatar = new PopupWithForm('.popup_avatar_redact', (data) => {
    popupUserSendAvatar.changeNameButtonSubmit('Coхранение...');
    api.sendAvatar(data).then((data) => {
        userInfoRedact.setAvatar(data.avatar);
        popupUserSendAvatar.close();
    }).catch((err) => {
        console.log(err);
    }).finally(() => { popupUserSendAvatar.returnNameButtonSubmit('Сохранить') })
});
popupUserSendAvatar.setEventListeners();
buttonRedactAvatar.addEventListener('click', () => {
    popupUserSendAvatar.open();
    formValidators['formUserAvatarAdd'].disableSubmitButton();
})

//**Попап редактирования профиля-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const userInfoRedact = new UserInfo('.profile__firstname', '.profile__subtext', '.profile__avatar');
const popupControlUserInput = new PopupWithForm('.popup_user_input', (data) => {
    popupControlUserInput.changeNameButtonSubmit('Coхранение...');
    api.sendUserInfo(data)
        .then((data) => {
            userInfoRedact.setUserInfo(data.name, data.about, data.avatar);
            popupControlUserInput.close()
        })
        .catch((err) => {
            console.log(err);
        }).finally(() => { popupControlUserInput.returnNameButtonSubmit('Сохранить') })
});
popupControlUserInput.setEventListeners();

// Открыть (свернуть вшито в метод класса)
buttonEdit.addEventListener('click', (e) => {
    popupControlUserInput.open();
    const userDataInfo = userInfoRedact.getUserInfo();
    firstNameInput.value = userDataInfo.name;
    professionInput.value = userDataInfo.about;
});


// создать карточку --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function createNewCard(name, link, dataCard, userId) {
    const newCard = new Card(config, controlScaleImage, name, link, deleteCard, likeCard, deleteLike, userId, dataCard);
    const returnImageUser = newCard.generateCard();
    return returnImageUser;
}


//удалить карточку--------------------------------------------------------------------------------------------------------------------------------------------
const deleteCardPopup = new PopupWithConfirmation('.popup_card_remove', (data) => {
    api.deleteCard(data.idImage)
        .then(() => {
            data.handleDelete();
            deleteCardPopup.close();
        }).catch((err) => {
            console.log(err);
        })
})
deleteCardPopup.setEventListeners();

const deleteCard = (card) => {
    deleteCardPopup.open(card);
}


//отрисовать карточки (вставить в разметку)--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const renderCards = new Section({
    renderer: (item) => {
        renderCards.addItem(createNewCard(item.name, item.link, item, userId))
    }
},
    containerOfImages
);


//добавить новую карточку, обработка инпутов формы(+слушатели) и отправка новой карточки на сервер-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const popupUserImageAdd = new PopupWithForm('.popup_image_content', (data) => {
    popupUserImageAdd.changeNameButtonSubmit('Coхранение...');
    api.sendImages(data).then((data) => {
        renderCards.createElement(data);
        popupUserImageAdd.close()
    })
        .catch((err) => {
            console.log(err);
        }).finally(() => { popupUserImageAdd.returnNameButtonSubmit('Сохранить') })
});
popupUserImageAdd.setEventListeners();

// Открыть (свернуть и слушатель на сабмит внутри метода класса)
imageAddButton.addEventListener('click', () => {
    popupUserImageAdd.open();
    formValidators['formUserImageAdd'].disableSubmitButton();
});

// Включение валидации-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const formValidators = {}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute('name')
        // объект записываем под именем формы
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(config);

// **Автоматическое создание карточек и получение инф о юзере c сервера при запустке страницы-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Promise.all([
    api.getUserInfo(),
    api.getImages()])
    .then(([infoUser, initialCards]) => {
        userId = infoUser._id;
        renderCards.createElements(initialCards);
        userInfoRedact.setUserInfo(infoUser.name, infoUser.about, infoUser.avatar);
    }).catch((err) => {
        console.log(err);
    }) 