
(async function() {

    let domain = window.location.hostname;
    //alert(domain);

    try {
        const response = await browser.runtime.sendMessage({
            action: "copyPassword",
            domain: domain
        });

       // alert("response: " + JSON.stringify(response));
       // alert("respass: " + response.password);
        console.log(response);

        if (response && response.password) {
            await navigator.clipboard.writeText(response.password);
         //   alert("password copied");
        } else {
         //   alert("no password found");
        }
    } catch (error) {
      //  alert("error: " + error);
    }
})();


browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "autoFillForm") {
        (async function() {

            let domain = window.location.hostname;
            let loginForm = document.querySelector('form');
        
            if (loginForm) {
                //alert("login form found");
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

                alert(username);
        
                let usernameField = document.querySelector('input[type="text"]');
                let emailField = document.querySelector('input[type="email"]');
                let passwordField = document.querySelector('input[type="password"]');

                let userField = usernameField ? usernameField : emailField;

                //alert(usernameField ? usernameField : "No username field");
                //alert(passwordField ? passwordField : "No password field");

        
                if(usernameField && passwordField) {
                    //alert("found the fields");
        
                    // usernameField.value = username;
                    // passwordField.value = password;
        
                    typeInField(userField, username);
                    typeInField(passwordField, password);

                    if (message.autologin) {
                        loginForm.submit();
                    }
        
                }
        
            } catch (error) {
                alert("error: " + error);
            }
        })();
    }
});

// if other framework
function setNativeValue(element, value) {
    const lastValue = element.value;
    element.value = value;
    const event = new Event('input', { bubbles: true });
    event.simulated = true;
    // Hack for React 15
    const tracker = element._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
}

//simulate typing
function typeInField(field, value) {
    setNativeValue(field, value);

    field.dispatchEvent(new Event("input", {bubbles : true}));
    field.dispatchEvent(new Event("change", {bubbles : true}));

}