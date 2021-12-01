import TeacherController from "./teacherController";
import LevelController from "./LevelController";

export default function controller(){

    var div = document.getElementById('container')
    var updateId = document.getElementById('updateId');
    var firstname = document.getElementById('updateFirstName');
    var lastname = document.getElementById('updateLastName');
    var submitBtn = document.getElementById('submitBtn');

    var createFirstName = document.getElementById('createFirstName')
    var createLastName = document.getElementById('createLastName')
    var create = document.getElementById('create')


    if(!submitBtn){
        return
    }

    const teachers = new TeacherController().index();
    const showTeacher = (id) => {
        return new TeacherController().show(id)
    }
    const destroyTeacher = (id) => {
        return new TeacherController().destroy(id)
    }
    const updateTeacher = (id, firstName, lastName) => {
        return new TeacherController().update(id, firstName, lastName)
    }
    const createTeacher = (firstname, lastname) => {
        return new TeacherController().create(firstname, lastname)
    }
 
    var cards = [];
    teachers.then((data)=>{
        data.forEach(element => {
            var teacherCard = `
            <div id="card" class="w-64 h-64 shadow-lg rounded-lg p-8">
                <div id="nameContainer">
                    <div class="mb-24">
                            <p id="firstName">${element.firstName}</p>
                            <p id="lastName">${element.lastName}</p>
                    </div>
                    <div id="here" class="px-4">
                        <button class="rounded p-2 bg-yellow-400 hover:bg-yellow-500 text-white mr-2" id="update" data-id="${element.id}" >Update</button>
                        <button class="rounded p-2 bg-yellow-400 hover:bg-yellow-500 text-white ml-2" id="delete" data-id="${element.id}">Delete</button>
                    </div>
                </div>
            </div>`;
            cards += teacherCard
        });
        div.innerHTML = cards
        return data
    }).then((data)=> {
        const del =  Array.from(document.querySelectorAll("#delete"));
        del.forEach(el =>{
            el.addEventListener('click', ()=>  {
                destroyTeacher(el.dataset.id)
                location.reload()
            })
        })
    }).then(()=>{
            const update =  Array.from(document.querySelectorAll("#update"));
            update.forEach(el => {
                el.addEventListener('click', () => {
                    showTeacher(el.dataset.id).then((data) => {
                        updateId.value = data.id
                        firstname.value = data.firstName
                        lastname.value = data.lastName
                    }).catch((err) => {
                        console.log(err)
                    })
                })
            })
    }).catch((err)=>{
        console.log('catched an err: ', err)
    })

    submitBtn.addEventListener('click', () =>{
        updateTeacher(updateId.value, firstname.value, lastname.value)
        location.reload()
    })

    create.addEventListener('click', () => {
        createTeacher(createFirstName.value, createLastName.value)
        console.log('clicked')
        location.reload()
    })
    
        
    
}

