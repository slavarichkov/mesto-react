//добавляет елемент в разметку

export default class Section {
    constructor({ renderer }, container) {
        this.renderer = renderer; // функция

        this.container = container;
    }

    //проработать массив
    createElements(data) {
        data.forEach(item => {
            this.renderer(item)
        })
    }
    //проработать запрос на 1 карточку
    createElement(data) {
        this.renderer(data)
    }

    addItem(element) {
        this.container.prepend(element);
    }
}
