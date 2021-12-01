import Teacher from "../models/Teacher";

export default class TeacherController {

    constructor(props) {
        this.props = props;
    }

    async index(){
        const response = await new Teacher().findAll();
        const data = await response.json()
        return data
    }

    async show(id){
        const response = await new Teacher().find(id);
        const data = await response.json()
        return data
    }

    async create(firstname, lastname){
        const student = new Teacher(
            {
                firstName: firstname,
                lastName: lastname
            }
        )
        student.create();
    }

    async destroy(id){
        const response = await new Teacher().destroy(id)
    }

    async update(id,firstName, lastName){
        const teacher =  new Teacher({
            firstName: firstName,
            lastName: lastName,
        });
        teacher.update(id)
    }
}