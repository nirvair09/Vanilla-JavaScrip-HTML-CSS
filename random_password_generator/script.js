const generateBtn = document.querySelector(".btn");
const input = document.querySelector(".password");
const copyBtn = document.querySelector(".copy-btn");


const generatePassword = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = 0; i < 14; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    input.value = password;
}

generateBtn.addEventListener("click", generatePassword);


copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(input.value);
    copyBtn.style.color = "lightgreen";

    setTimeout(() => {
        copyBtn.style.color = "black"
    }, 1000);
});

