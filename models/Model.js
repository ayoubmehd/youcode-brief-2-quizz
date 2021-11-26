const url = "http://localhost:8000";
const headers = {
    'Content-Type': 'application/json'
};

export default class Model {

    constructor(props) {
        this.props = props;
    }

    async findAll() {
        return await fetch(`${url}/${this.endpoint}`);
    }

    async create() {
        return await fetch(`${url}/${this.endpoint}`, {
            method: "POST",
            headers,
            body: JSON.stringify(this.props)
        });
    }

    async find(id) {
        return await fetch(`${url}/${this.endpoint}/${id}`);
    }

    async update(id) {
        return await fetch(`${url}/${this.endpoint}/${id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(this.props)
        });
    }

    async delete(id) {
        return await fetch(`${url}/${this.endpoint}/${id}`, {
            method: "DELETE",
            headers
        });
    }

}