import Level from "../models/Level";

export default class LevelController{

    constructor(props) {
        this.props = props;
    }

    async index(){
        const response = await new Level().findAll();
        const data = await response.json()
        return data
    }
    async show(id){
        const response = await new Level().find(id);
        const data = await response.json()
        console.log(data)
        return data
    }
    async create(description){
        const level = new Level(
            {
                description: description,
            }
        )
        level.create();
    }
    async destroy(id){
        const response = await new Level().destroy(id)
    }
    async update(id,description){
        const level =  new Level({
            description: description
        });
        level.update(id)
    }
}