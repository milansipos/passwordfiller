
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

// (function() {
//     document.querySelectorAll("input[type='password']").forEach(inputField => {
//         inputField.addEventListener("focus", async () => {
//             console.log("focused");
//             let domain = window.location.hostname;
    
//             alert(domain);
    
//             browser.runtime.sendMessage(
//                 {action: "getPassword", domain },
//                 (response) => {
//                     if (response.password) {
//                         inputField.value = response.password;
//                     } else {
//                         console.log("no password found")
//                     }
//                 }
//             )
//         });
//     });
// })();


