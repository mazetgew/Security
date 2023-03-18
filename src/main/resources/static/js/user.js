const url = '/api/user/'

const showNavbarInfoUser = (user) => {
    const navbarInfo = document.getElementById('navbarInfo')
    let result = `
                <span class="navbar-brand">
                    <strong>${user.email}</strong>
                    with roles:
                    <span>${user.stringRoles}</span>
                </span>
                <a class="btn btn-link text-secondary" href="/logout" role="button">Logout</a>
                `
    navbarInfo.innerHTML = result
}

fetch(url)
    .then(response => response.json())
    .then(data => showNavbarInfoUser(data))
    .catch(error => console.log(error))

let userPageInfo = ''
const showUserInfo = (user) => {
    const container = document.querySelector('tbody')
    userPageInfo += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.firstName}</td>  
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>       
                    <td>${user.stringRoles}</td>  
                </tr>
                `
    container.innerHTML = userPageInfo
}

fetch(url)
    .then(response => response.json())
    .then(data => showUserInfo(data))
    .catch(error => console.log(error))