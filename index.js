// Declaring the arrays we'll be using to generate our passwords
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

const noSymArray = characters.slice(0, 62);

const letterArray = characters.slice(0, 52);

const symArray = characters.slice(62, 91);

const noNumArray = letterArray.concat(symArray);

// Captures our HTML elements
let passOneEl = document.querySelector("#password-one-el");
let passTwoEl = document.querySelector("#password-two-el");
let numCheckbox = document.querySelector("#wantNumbers");
let symCheckbox = document.querySelector("#wantSymbols");


// This function checks to see if the number checkbox is clicked and returns a boolean value
function isNumChecked() {
    return numCheckbox.checked;
}


// This function checks to see if the symbol checkbox is clicked and returns a boolean value
function isSymChecked() {
    return symCheckbox.checked;
}

// This function captures the users desired password length
function getVal() {
    let passLength = document.querySelector("#pass-length").value;
    return passLength;
}


// This function takes in the array we want to use and returns our password
function loop(array) {
    let pass = [];
    for(let i = 0; i < getVal(); i++){
            let randomChar = Math.floor(Math.random() * array.length);
            pass.push(array[randomChar]);
    }
    return pass.toString().replace(/,/g,'');
}


// This function should work normally but I believe that the scrimba browser doesn't allow for clipboard access
function copy() {
    
    let copiedPass = event.target.textContent;
    
    // window.navigator.clipboard.writeText(copiedPass);
    
    copyUsingExecCommand(copiedPass);
    
    console.log(copiedPass);
    
}

// This function creates an input element just so that we can capture the text we clicked on Once we're done copying the text to our clipboard the input is deleted, it all happens in the matter of a second or so
function copyUsingExecCommand(text) {
    let input = document.createElement("input");
    input.value = text;
    input.readOnly = true;
    document.body.append(input)
    input.select();
    document.execCommand("copy");
    input.remove();
}


// This is our main function that generates the users password
function passGenV3() {
    // These clear out the password containers so that they don't get overfilled whenever the user clicks the generate password button without refreshing the page
    passOneEl.textContent = " "
    passTwoEl.textContent = " "
       // Holds the boolean value for our number checkbox
    let num = isNumChecked();
    // Holds the boolean value for our symbol checkbox
    let sym = isSymChecked();

    // This will run if the user doesn't want numbers or symbols
    if (!num && !sym) {
        
        passOneEl.textContent += loop(letterArray);
        passTwoEl.textContent += loop(letterArray);
        
      // This will run if the user doesn't want symbols    
    } else if (!sym) {
        passOneEl.textContent += loop(noSymArray);
        passTwoEl.textContent += loop(noSymArray);

      // This will run if the user doesn't want numbers  
    } else if (!num) {
        passOneEl.textContent += loop(noNumArray);
        passTwoEl.textContent += loop(noNumArray);  
        
      // This will run if the user wants numbers and symbols   
    } else {
        passOneEl.textContent += loop(characters);
        passTwoEl.textContent += loop(characters);   

    }
}