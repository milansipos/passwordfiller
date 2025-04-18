
console.log("loaded")


document.getElementById("viewPasswords").addEventListener("click", () => {
    window.location.href = "passwords.html";
})


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

    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`)
    }

    try {
        let response = await fetch("http://localhost:8080/index.php?page=get_password", {
            method: "POST",
            body: formData
        });
        let data = await response.text();

        if(data === "No passwords found") {
            document.getElementById("textpassword").innerText = data + " ❌";
        } else {
            document.getElementById("textpassword").innerText = "Copied to clipboard! ✅";
            await navigator.clipboard.writeText(data);
        }
    } catch(error) {
        console.error("Error:", error);
    }
});

document.getElementById("sitepassword").addEventListener("click", async function() {
    
    let domain = await getDomain();

    let postBody = new URLSearchParams();
    postBody.append("url", domain);

    try{
        let response = await fetch("http://localhost:8080/index.php?page=get_password", {
            method: "POST",
            body: postBody
        });
        let data = await response.text();

        if(data === "No passwords found") {
            document.getElementById("textpassword").innerText = data + " for this site. ❌";
        } else {
            document.getElementById("textpassword").innerText = "Copied to clipboard! ✅";
            await navigator.clipboard.writeText(data);
        }
    } catch(error) {
        console.error("Error:", error);
    }
});

// button to fill out form on website automatically

document.getElementById("autofillbutton").addEventListener("click", function() {
    browser.tabs.query({ active : true, currentWindow : true}, function(tabs) {
        let tab = tabs[0];

        let autologin = document.getElementById("fillcheckbox").checked;
        if (tab) {
            browser.tabs.sendMessage(tab.id, { action: "autoFillForm", autologin: autologin});
        }
    });
});


