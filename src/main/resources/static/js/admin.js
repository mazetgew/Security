const url = "/api/admin/"

const dbRoles = [ {
        id: 1,
        name: "ROLE_USER"
    },
    {
        id: 2,
        name: "ROLE_ADMIN"
    }]

const showNavbarInfo = (user) => {
    const navbarInfo = document.getElementById('navbarInfo')
    navbarInfo.innerHTML = `
                <span class="navbar-brand">
                    <strong>${user.username}</strong>
                    with roles:
                    <span>${user.getStringRoles}</span>
                </span>
                <form action="/logout" method="POST">
                    <button type="submit" class="btn btn-dark">Logout</button>
                </form>
                `
}
fetch('/api/user/')
    .then(response => response.json())
    .then(data => showNavbarInfo(data))
    .catch(error => console.log(error))

// Таблица
let usersInfo = ''
const showUsers = (users) => {
    const container = document.querySelectorAll('tbody')[0]
    users.forEach(user => {
        usersInfo += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.firstName}</td>  
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>       
                    <td>${user.getStringRoles}</td>   
                    <td class="text text-white"><a class="btnEdit btn btn-info">Edit</a></td>  
                    <td class="text text-white"><a class="btnDelete btn btn-danger">Delete</a></td>
                </tr>
                `
    })
    container.innerHTML = usersInfo
}
fetch(url)
    .then(response => response.json())
    .then(data => showUsers(data))
    .catch(error => console.log(error))

const reloadShowUsers = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            usersInfo = ''
            showUsers(data)
        })
}

// Информация пользователя
let userInfo = ''
const showUser = (user) => {
    const container = document.querySelectorAll('tbody')[1]
    userInfo += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.firstName}</td>  
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>       
                    <td>${user.getStringRoles}</td>   
                </tr>
                `
    container.innerHTML = userInfo
}
fetch('/api/user/')
    .then(response => response.json())
    .then(data => showUser(data))
    .catch(error => console.log(error))


// Создание нового пользователя
const formNew = document.getElementById('newUserForm')
const username = document.getElementById('username')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const age = document.getElementById('age')
const email = document.getElementById('email')
const password = document.getElementById('password')
const roles = document.getElementById('roles')
let option = ''

btnNewUser.addEventListener('click', () => {
    console.log('btnNewUser click')
    username.value = ''
    firstName.value = ''
    lastName.value = ''
    age.value = ''
    email.value = ''
    password.value = ''
    roles.innerHTML = `
                        <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
                        <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
                        `
    option = 'newUser'
})

formNew.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(document.getElementById('roles'))
    console.log(
        username.value, firstName.value, lastName.value, age.value, email.value, password.value, listRoles
    )
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value,
            age: age.value,
            email: email.value,
            password: password.value,
            roles: listRoles
        })
    })
        .then(res => res.json())
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    $('.nav-tabs a[href="#usersTable"]').tab('show')
})

// Редактирование пользователя
const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'))
const editForm = document.getElementById('modalEdit')
const usernameEdit = document.getElementById('usernameEdit')
const firstNameEdit = document.getElementById('firstNameEdit')
const lastNameEdit = document.getElementById('lastNameEdit')
const ageEdit = document.getElementById('ageEdit')
const emailEdit = document.getElementById('emailEdit')
const passwordEdit = document.getElementById('passwordEdit')
const rolesEdit = document.getElementById('rolesEdit')

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

let idForm = 0
on(document, 'click', '.btnEdit', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML

    fetch(url + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        usernameEdit.value = user.username
        firstNameEdit.value = user.firstName
        lastName.value = user.lastName
        ageEdit.value = user.age
        emailEdit.value = user.email
        passwordEdit.value = ''
        rolesEdit.innerHTML = `
                                <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
                                <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
                                `
        Array.from(rolesEdit.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        modalEdit.show()
    }
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(document.getElementById('rolesEdit'))
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: idForm,
            username: usernameEdit.value,
            firstName: firstNameEdit.value,
            lastName: lastNameEdit.value,
            age: ageEdit.value,
            email: emailEdit.value,
            password: passwordEdit.value,
            roles: listRoles
        })
    })
        .then(res => res.json())
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalEdit.hide()
})

// Удаление пользователя
const modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'))
const deleteForm = document.getElementById('modalDelete')
const idDelete = document.getElementById('idDelete')
const usernameDelete = document.getElementById('usernameDelete')
const firstNameDelete = document.getElementById('firstNameDelete')
const lastNameDelete = document.getElementById('lastNameDelete')
const ageDelete = document.getElementById('ageDelete')
const emailDelete = document.getElementById('emailDelete')
const rolesDelete = document.getElementById('rolesDelete')

on(document, 'click', '.btnDelete', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    fetch(url + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        idDelete.value = user.id
        usernameDelete.value = user.username
        firstNameDelete.value = user.firstName
        lastNameDelete.value = user.lastName
        ageDelete.value = user.age
        emailDelete.value = user.email
        rolesDelete.innerHTML = `
                                    <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
                                    <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
                                    `
        Array.from(rolesDelete.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        modalDelete.show()
    }
})

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(url + idForm, {
        method: 'DELETE'
    })
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalDelete.hide()
})

let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }
    return array;
}
