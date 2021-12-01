import LevelController from "./LevelController";

export default function levels(){
    var levelContainer = document.getElementById('levelContainer')
    var createDescription = document.getElementById('createDescription')
    var createL = document.getElementById('createLevel')
    var levelId = document.getElementById('id')
    var updateDescription = document.getElementById('des')
    var updateBtn = document.getElementById('upd')

    const levels = new LevelController().index();
    const destroyLevel = (id) => {
            return new LevelController().destroy(id)
    }
    const showLevel = (id) => {
        return new LevelController().show(id)
    }
    const updateLevel = (id,description) => {
        return new LevelController().update(id,description)
    }
    const createLevel = (description) => {
        return new LevelController().create(description)
    }
    var lvlCards = [];

    if(!levelContainer){
        return
    }

    levels.then((data)=> {
            console.log(data)
            data.forEach((el) => {
                var levelCard = `
                <div id="card" class="w-64 h-64 shadow-lg rounded-lg p-8">
                    <div id="nameContainer">
                        <div class="mb-24">
                                <p id="firstName">${el.description}</p>
                        </div>
                        <div id="here" class="px-4">
                            <button class="rounded p-2 bg-yellow-400 hover:bg-yellow-500 text-white mr-2" id="updateLevel" data-id="${el.id}" >Update</button>
                            <button class="rounded p-2 bg-yellow-400 hover:bg-yellow-500 text-white ml-2" id="deleteLevel" data-id="${el.id}">Delete</button>
                        </div>
                    </div>
                </div>`;
                lvlCards += levelCard
            })
            levelContainer.innerHTML = lvlCards
            return data
        }).then((data)=>{
            const del =  Array.from(document.querySelectorAll("#deleteLevel"));
            del.forEach(el =>{
                el.addEventListener('click', ()=>  {
                    destroyLevel(el.dataset.id)
                    location.reload()
                })
            })
        }).then(()=> {
            const update =  Array.from(document.querySelectorAll("#updateLevel"));
            update.forEach(el => {
                el.addEventListener('click', () => {
                    showLevel(el.dataset.id).then((data) => {
                        levelId.value = data.id
                        updateDescription.value = data.description
                    }).catch((err) => {
                        console.log(err)
                    })
                })
            })
        }).catch((err) => {
            console.log(err)
        })

        updateBtn.addEventListener('click', () =>{
             updateLevel(levelId.value, updateDescription.value)
             location.reload()
        })
    
        createL.addEventListener('click', () => {
            createLevel(createDescription.value)
            location.reload()
        })
        
}

