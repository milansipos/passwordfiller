
console.log("background script loaded!");

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getPassword" || message.action === "copyPassword") {
        let domain = message.domain;

        let postBody = new URLSearchParams();
        postBody.append("url", domain);
        
        fetch("http://localhost:8080/index.php?page=get_password", {
            method: "POST",
            body: postBody
        })
        .then(response => response.text())
        .then(data => {
            console.log("fetched data: " + data);
            sendResponse({ password: data || null});
        })
        .catch(error => {
            console.error("error:" + error);
            sendResponse({error: "failed to fetch"});
        });

        return true;
    }
});