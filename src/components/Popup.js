// открыть закрыть Попап

export default class Popup {
    constructor(popup) {
        this._popup = document.querySelector(popup);
        this._buttonClosePopup = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);

    }

    open() {
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    // закрыть на Esc
    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    //закрыть кликом на оверлей
    _handleOverlayClose(e) {
        if (e.target.classList.contains('popup_overlay')) {
            this.close();
        }
    }

    // закрыть кликом на оверлей или кнопку закрытия попапа
    setEventListeners() {
        this.closePopup = () => this.close();
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
        this._buttonClosePopup.addEventListener('click', this.closePopup);
        this._popup.addEventListener('click', this._handleOverlayClose);
    }
}