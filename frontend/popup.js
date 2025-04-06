
console.log("loaded")



document.getElementById("myform").addEventListener("submit", async function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    //get websites full url and domain to send with form
    let domain = await getDomain();

    console.log(domain);
    formData.append("url", domain);

    try {
        let response = await fetch("http://localhost:8080/index.php?page=add_password", {
            method: "POST",
            body: formData
        });
        let data = await response.text();
        document.getElementById("response").innerText = data;
    } catch(error) {
        console.error("Error: ", error);
    }
});

//helper function
async function getDomain() {
    let tabs = await browser.tabs.query({ active : true, currentWindow: true});
    const fullurl = tabs[0].url;
    const domain = new URL(fullurl).hostname;

    return domain;
}


document.getElementById("getpass").addEventListener("submit", async function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    try {
        let response = await fetch("http://localhost:8080/index.php?page=get_password", {
            method: "POST",
            body: formData
        });
        let data = await response.text();
        document.getElementById("textpassword").innerText = data;
        await navigator.clipboard.writeText(data);
    } catch(error) {
        console.error("Error:", error);
    }

    // fetch("http://localhost:8080/index.php?page=get_password", {
    //     method: "POST",
    //     body: formData
    // })
    // .then(response => response.text())
    // .then(data => {
    //     document.getElementById("textpassword").innerText = data;
    //     console.log(data);
    //     navigator.clipboard.writeText(data).then(function(){
    //         console.log("copied successfully");
    //     }), function(err) {
    //         console.error("Could not copy text: ", err);
    //     }
    // })
    // .catch(error => console.error("Error:", error));
});


