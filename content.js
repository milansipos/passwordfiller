
(async function() {

    let domain = window.location.hostname;
    alert(domain);

    try {
        const response = await browser.runtime.sendMessage({
            action: "copyPassword",
            domain: domain
        });

        alert("response: " + JSON.stringify(response));
        alert("respass: " + response.password);
        console.log(response);

        if (response && response.password) {
            await navigator.clipboard.writeText(response.password);
            alert("password copied");
        } else {
            alert("no password found");
        }
    } catch (error) {
        alert("error: " + error);
    }
})();


browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "autoFillForm") {
        (async function() {

            let domain = window.location.hostname;
            let loginForm = document.querySelector('form');
        
            if (loginForm) {
                alert("login form found");
            }
        
            try {
                const response = await browser.runtime.sendMessage({
                    action: "copyPassword",
                    domain: domain
                });
        
                let password = response.password;
                
                const response2 = await browser.runtime.sendMessage({
                    action: "getUsername",
                    domain: domain
                });
        
                let username = response2.username;
        
                let usernameField = loginForm.querySelector('input[type="text"], input[type="email"]');
                let passwordField = loginForm.querySelector('input[type="password"]');
        
                if(usernameField && passwordField) {
                    alert("found the fields");
        
                    usernameField.value = username;
                    passwordField.value = password;
        
                    //loginForm.submit();
        
                }
        
            } catch (error) {
                alert("error: " + error);
            }
        })();
    }
});




