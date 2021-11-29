import Model from "./Model";

export default class User extends Model {
    endpoint = 'users';

    constructor() {
        super();
    }

    async login(username, password) {
        const res = await fetch(`${this.url}/${this.endpoint}/?username=${username}&passwrod=${password}`);
        return await res.json();
    }
}