
fetch("http://localhost:8080/index.php?page=jsonapi")
.then(response => response.json())
.then(data => {
    const list = document.getElementById("passwordList");
    data.forEach(entry => {
        const item = document.createElement("div");
        //item.textContent = `${entry.url} - ${entry.username} - ${entry.password}`;
        item.classList.add("listing");
        const urlAndUser = document.createElement("div");
        urlAndUser.textContent = `${entry.url} - ${entry.username}`;
        urlAndUser.classList.add("url_user");
        const password = document.createElement("div");
        password.textContent = `${entry.password}`;
        password.classList.add("password");
        item.appendChild(urlAndUser);
        item.appendChild(password);
        list.appendChild(item);
    });
})
.catch(error => {
    console.error("error fetching passwords");
});

document.getElementById("returnpopup").addEventListener("click", () => {
    window.location.href = "popup.html";
});