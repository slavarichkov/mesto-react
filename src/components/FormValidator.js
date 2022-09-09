class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        this.buttonElement = this.formElement.querySelector(this.config.submitButtonSelector);
    }

    // показать ошибку, принимает форму, инпут, сообщение об ошибке
    _showInputError(input) {
        // найти спан 
        const inputCont = input.closest(this.config.inputConainerSelector);
        const errorElement = inputCont.querySelector(this.config.textErrorSelector);
        // подчеркнуть поле ввода красным
        input.classList.add(this.config.typeErrorOnClass);
        // выдернуть ошибку, чтобы добавить в спан и отобразить
        errorElement.textContent = input.validationMessage;
        // сделать видимой ошибку
        errorElement.classList.add(this.config.errorClass);
    }


    //   спрятать ошибку инпута
    _hideInputError(input) {
        // найти спан 
        const inputCont = input.closest(this.config.inputConainerSelector);
        const errorElement = inputCont.querySelector(this.config.textErrorSelector);
        // Удаляем классы подчеркивания и видимости текста
        input.classList.remove(this.config.typeErrorOnClass);
        errorElement.classList.add(this.config.errorClass);
        // очищаем
        errorElement.textContent = '';
    };

    //   проверка на валидность инпута
    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }
    };

    //   добавление слушателя
    _setEventListeners() {
        // проходим по массиву и проверяем при вводе валидность поля и меняем поведение кнопки в зависимости от валидности
        this.inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            });
        });
    };

    // задисэйблить кнопку
    disableSubmitButton() {
        this.buttonElement.classList.add(this.config.inactiveButtonClass);
        this.buttonElement.disabled = true;
    }

    //   проверить валидны ли все инпуты внутри формы
    _hasInvalidInput() {
        return this.inputList.some((input) => {
            return !input.validity.valid;
        });
    }

    //   состояние кнопки
    _toggleButtonState() {

        if (this._hasInvalidInput()) {
            this.disableSubmitButton();
        } else {
            this.buttonElement.classList.remove(this.config.inactiveButtonClass);
            this.buttonElement.disabled = false;
        }
    }

    enableValidation() {
            this._setEventListeners();
    }
}

export default FormValidator
