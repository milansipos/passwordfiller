
console.log("loaded")

browser.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    const fullurl = tabs[0].url;
    const domain = new URL(fullurl).hostname;
    console.log(fullurl);
    console.log(domain);
})

document.getElementById("myform").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch("http://localhost:8080/index.php?page=add_password", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("response").innerText = data;
    })
    .catch(error => console.error("Error:", error))
})

document.getElementById("getpass").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch("http://localhost:8080/index.php?page=get_password", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("textpassword").innerText = data;
        console.log(data);
        navigator.clipboard.writeText(data).then(function(){
            console.log("copied successfully");
        }), function(err) {
            console.error("Could not copy text: ", err);
        }
    })
    .catch(error => console.error("Error:", error));
});


