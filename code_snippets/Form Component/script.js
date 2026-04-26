/*
  LEARNING LOG & TECHNICAL DEBRIEF:
  
  1. WHY THE PAGE WAS RELOADING (INITIAL ISSUE):
     - The button was inside a <form>, which makes it a "Submit" button by default.
     - The HTML had `onclick="submitForm(e)"`. In inline handlers, 'e' is undefined (browsers use 'event').
     - Because 'e' was undefined, the script crashed before reaching `e.preventDefault()`.
     - FIX: Used `addEventListener` in JS and `e.preventDefault()` to stop the browser's default reload.

  2. DOM ELEMENTS VS. STRING VALUES:
     - `emailInput` is an OBJECT (the HTML element/box).
     - `emailInput.value` is a STRING (the actual text typed inside).
     - BREAKING POINT: Trying to use `.classList` or `.textContent` on a string (e.g., `email.classList`) 
       fails because strings don't have those properties. Only Objects/Elements do.

  3. TEXTCONTENT VS. VALUE:
     - <input> tags use the `.value` property to show text. They DON'T show `.textContent`.
     - FIX: Created a separate <span> element with id="error" to display error messages.

  4. DOM SELECTION:
     - We must use `document.getElementById()` to "grab" elements from HTML before we can use them in JS.
*/

// --- 1. DOM Selection (Grabbing our HTML elements) ---
const form = document.getElementById("myForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const formbtn = document.getElementById("formbtn");
const error = document.getElementById("error");

// --- 2. Event Listener (Modern way to handle clicks/submits) ---
formbtn.addEventListener("click", function (e) {
    // Stops the page from refreshing (the default form behavior)
    e.preventDefault();

    // --- 3. Data Extraction (Getting the text strings from the boxes) ---
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value; // Note: We use .value to get the string

    // Clear previous error message
    error.textContent = "";

    // --- 4. Validation Logic ---
    
    // Check if fields are empty
    if (name === "" || email === "" || password === "") {
        error.textContent = "Please Fill All The Fields";
        return;
    }

    // Email validation (Checking string content)
    if (!email.includes("@")) {
        // We use 'error' (the span) for text, but 'emailInput' (the box) for styles
        error.textContent = "please enter a valid email";
        emailInput.classList.add("invalid");
        return;
    } else {
        emailInput.classList.remove("invalid");
    }

    // Password validation (Checking string length)
    // Note: Use 'password.length' (the string length), not 'passwordInput.length'
    if (password.length < 6) {
        error.textContent = "please enter password more than 6";
        passwordInput.classList.add("invalid");
        return;
    } else {
        passwordInput.classList.remove("invalid");
    }

    // --- 5. Final Execution ---
    console.log("Success:", name, email, password);
    alert("Form submitted successfully!");
});