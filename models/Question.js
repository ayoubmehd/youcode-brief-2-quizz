import Model from "./Model"

export default class Question extends Model {
    endpoint = 'questions';

    async findAll() {
        return await fetch(`${this.url}/${this.endpoint}?_expand=level`);
    }

    async find(id) {
        return await fetch(`${this.url}/${this.endpoint}/${id}?_expand=level`);
    }

}