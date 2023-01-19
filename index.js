// It is often ideal to wrap your code in a function, even an anonymous one like this example
// makes it so the variables you declare are private to your functionality and won't conflict or overwrite
// other code that may be included in the page. This means your function declarations won't be accessible in the HTML
// but that doesn't mean we still can't make them do what we want.
(() => {
    // Declaring the arrays we'll be using to generate our passwords
    const characters = [
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
        "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"
    ];

    // Another way for declaring a group of variables using ES, syntactical sugar / preference
    const [ noSymArray, letterArray, symArray ] = [
        characters.slice(0, 62),
        characters.slice(0, 52),
        characters.slice(62, 91)
    ];

    const noNumArray = letterArray.concat(symArray);

    // Captures our HTML elements
    // We can use the `const` declaration here since we won't ever be redeclaring these variables.
    // We can also use document.getElementByid(elem_id) since your query selector is an ID tag.
    const passOneEl = document.getElementById("password-one-el");
    const passTwoEl = document.getElementById("password-two-el");
    const numCheckbox = document.getElementById("wantNumbers");
    const symCheckbox = document.getElementById("wantSymbols");

    /**
     * This function checks to see if the number checkbox is clicked and returns a boolean value
     * @returns True if the checkbox is checked.
     */
    const isNumChecked = () => { // This is another way to declare the function using a more ES approach.
        return numCheckbox.checked;
    }

    /**
     * This function checks to see if the symbol checkbox is clicked and returns a boolean value
     * @returns True if the checkbox is checked.
     */
    function isSymChecked() {
        return symCheckbox.checked;
    }

    /**
     * This function captures the users desired password length
     * @returns integer
     */
    function getPasswordLength() {
        const passLength = document.getElementById("pass-length").value;
        return passLength;
    }

    /**
     * This function takes in the array we want to use and returns our password
     * @param {string[]} character_list The list of characters to choose from.
     * @returns string 
     */
    function getRandomCharacters(character_list) {
        const pass = [];
        for(let i = 0; i < getPasswordLength(); i++){
            const randomChar = Math.floor(Math.random() * character_list.length);
            pass.push(character_list[randomChar]);
        }
        return pass.toString().replace(/,/g, '');
    }

    /**
     * Copy using the execCommand approach - deprecated browser functionality. https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
     * @param {string} text 
     */
    function copyUsingExecCommand(text) {
        const input = document.createElement("input");
        input.value = text;
        input.readOnly = true;
        document.body.append(input)
        input.select();
        document.execCommand("copy");
        input.remove();
    }

    /**
     * This function should work normally but I believe that the scrimba browser doesn't allow for clipboard access
     * @param {Event} event The `event` variable into this function. It is not globally accessible normally, but when a click event happens the `event` variable is raised with it.
     */
    function copy(event) {
        const copiedPass = event.target.textContent;
        // window.navigator.clipboard.writeText(copiedPass);
        copyUsingExecCommand(copiedPass);
        console.log(copiedPass);
    }

    /**
     * This is our main function that generates the users password
     */
    function passGenV3() {
        // These clear out the password containers so that they don't get overfilled whenever the user clicks the generate password button without refreshing the page
        passOneEl.textContent = " "
        passTwoEl.textContent = " "
        // Holds the boolean value for our number checkbox
        const num = isNumChecked();
        // Holds the boolean value for our symbol checkbox
        const sym = isSymChecked();

        // This will run if the user doesn't want numbers or symbols
        if (!num && !sym) {
            
            passOneEl.textContent += getRandomCharacters(letterArray);
            passTwoEl.textContent += getRandomCharacters(letterArray);
            
        // This will run if the user doesn't want symbols    
        } else if (!sym) {
            passOneEl.textContent += getRandomCharacters(noSymArray);
            passTwoEl.textContent += getRandomCharacters(noSymArray);

        // This will run if the user doesn't want numbers  
        } else if (!num) {
            passOneEl.textContent += getRandomCharacters(noNumArray);
            passTwoEl.textContent += getRandomCharacters(noNumArray);  
            
        // This will run if the user wants numbers and symbols   
        } else {
            passOneEl.textContent += getRandomCharacters(characters);
            passTwoEl.textContent += getRandomCharacters(characters);   

        }
    }

    // Now that all of our functions and variables are declared, we can bind them to the element actions (like click events) here.
    const password_containers = document.querySelectorAll('.password-container');
    password_containers.forEach(container_elem => {
        container_elem.addEventListener('click', event => {
            // Here our click event is raising the `event` variable that has all the information about the click.
            // console.log('My click event', event); // uncomment this code to see what the click event includes
            copy(event);
        });
    });

    // Password length blur event
    document.getElementById("pass-length").addEventListener('blur', () => {
        getPasswordLength();
    });

    // Prevent form from attempting to submit
    // I wrapped the form elements into a `form` tag. This is good practice because people with disabilities use special devices that
    // can more easily understand form elements if they are structured within form tags. But our form isn't supposed to submit the data
    // anywhere, so we need to tell the web browser to prevent it from trying (which is the default for forms).
    document.getElementById('password-form').addEventListener('submit', event => {
        event.preventDefault();
    });

    // Button Click Event
    document.getElementById('button-password-generate').addEventListener('click', () => {
        passGenV3();
    });

    // Checkbox click events
    numCheckbox.addEventListener('click', () => {
        isNumChecked();
    });
    symCheckbox.addEventListener('click', () => {
        isSymChecked();
    });

})();
