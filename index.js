# index.js

```javascript
const btnE1 = document.querySelector(".btn");
const inputE1 = document.getElementById("input");
const copyIconE1 = document.querySelector(".fa-copy");
const alertContainerE1 = document.querySelector(".alert-container");

btnE1.addEventListener("click", createPassword);

copyIconE1.addEventListener("click", () => {

    if (!inputE1.value) {
        return;
    }

    copyPassword();

    alertContainerE1.classList.remove("active");

    setTimeout(() => {
        alertContainerE1.classList.add("active");
    }, 2000);

});

function createPassword() {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    const passwordLength = 14;

    let password = "";

    for (let i = 0; i < passwordLength; i++) {

        const randomNum =
            Math.floor(Math.random() * chars.length);

        password += chars[randomNum];
    }

    inputE1.value = password;
}

function copyPassword() {

    inputE1.select();

    inputE1.setSelectionRange(0, 9999);

    navigator.clipboard.writeText(inputE1.value)
        .then(() => {
            console.log("Password Copied");
        })
        .catch(() => {
            console.log("Copy Failed");
        });
}
```
