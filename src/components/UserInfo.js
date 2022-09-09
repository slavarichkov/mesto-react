export default class UserInfo {
    constructor(name, proffesion, avatar, redactUserInfo) {
        this._userName = document.querySelector(name);
        this._userProffesion = document.querySelector(proffesion);
        this._redactUserInfo = redactUserInfo;
        this._avatar = document.querySelector(avatar);
    }

    //данные пользователя со страницы для добавления в попап при открытии
    getUserInfo() {
        return {
        name: this._userName.textContent, 
        about: this._userProffesion.textContent 
        }
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, proffesion, avatar) {
        this._userName.textContent = name;
        this._userProffesion.textContent = proffesion;
        this.setAvatar(avatar);
    }

    //принимает новыую ссылку на аватар и отрисовывает её
    setAvatar(avatar) {
        this._avatar.setAttribute('src', avatar);
    }


}