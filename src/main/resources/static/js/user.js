const url = "/api/user"

const showNavbarInfoUser = (user) => {
    let navbarInfo;
    navbarInfo = document.getElementById('navbarInfo');
    navbarInfo.innerHTML = `
                <span class="navbar-brand">
                    <strong>${user.username}</strong>
                    with roles:
                    <span>${user.roles.name}</span>
                </span>
                <form action="/logout" method="POST">
                    <button type="submit" class="btn btn-dark">Logout</button>
                </form>
                `
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
                    <td>${user.roles.name}</td>
                </tr>
                `
    container.innerHTML = userPageInfo
}

fetch(url)
    .then(response => response.json())
    .then(data => showUserInfo(data))
    .catch(error => console.log(error))