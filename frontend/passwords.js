
fetch("http://localhost:8080/index.php?page=jsonapi")
.then(response => response.json())
.then(data => {
    const list = document.getElementById("passwordList");
    data.forEach(entry => {
        const item = document.createElement("div");
        item.textContent = `${entry.url} - ${entry.username} - ${entry.password}`;
        list.appendChild(item);
    });
})
.catch(error => {
    console.error("error fetching passwords");
});