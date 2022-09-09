import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(selectorPopup, handleSendForm) {
        super(selectorPopup);
        this._form = this._popup.querySelector('.popup__form');
        this._handleSendForm = handleSendForm;
    }

    open(dataCard) {
        super.open();
        this._data = dataCard;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSendForm(this._data);
            this.setSubmitHandler;
        });
    }

}