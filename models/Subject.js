import Model from "./Model";


export default class Subject extends Model {
    endpoint = 'subjects';

    async findAll() {
        return await fetch(`${this.url}/${this.endpoint}?_expand=subject&_embed=subjects`);
    }

    async findSuperSubjects(withChilds = true) {
        return await fetch(`${this.url}/${this.endpoint}?subjectId=default&${withChilds && '_embed=subjects'}`);
    }

    async find(id) {
        return await fetch(`${this.url}/${this.endpoint}/${id}?_expand=subject`);
    }

}