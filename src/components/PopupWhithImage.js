import Popup from "./Popup.js";

export default class PopupWhithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._imageBigText = this._popup.querySelector('.popup__image-title');
        this._imageBig = this._popup.querySelector('.popup__image-scale');
    }

    open(name, link) {
        super.open();
        this._imageBig.setAttribute('src', link);
        this._imageBig.setAttribute('alt', name);
        this._imageBigText.textContent = name;
    }
}