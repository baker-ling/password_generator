// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {
  const options = getPasswordOptions(); 

  // if the user options are null, do nothing
  if (options === null) return null;

  // construct sequence of characters to select from
  let eligibleChars = "";
  if (options.includeLower) eligibleChars += "abcdefghijklmnopqrstuvwxyz";
  if (options.includeUpper) eligibleChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (options.includeNumeric) eligibleChars += "0123456789";
  if (options.includeSpecial) eligibleChars += " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  // construct password by selecting from eligible characters
  let password = "";
  for (let i = 0; i < options.length; i++) {
    let charIndex = Math.floor(Math.random() * eligibleChars.length);
    password += eligibleChars.charAt(charIndex);
  }

  return password;
}


/* Returns an object containing options for generating a password obtained from user input.
   Returns null if the user cancelled entry when asked for a length.
   Properties of object returned:
      length:         int indicating desired password length
      includeLower:   boolean indicating whether or not to include lowercase alphabet letters
      includeUpper:   boolean indicating whether or not to include uppercase alphabet letters
      includeNumeric: boolean indicating whether or not to include numeric characters
      includeSpecial: boolean indicating whether or not to include special characters (space, puntuation, and symbols)
 */
function getPasswordOptions() {
  const options = {};
  options.length = 0;

  // Prompt for, validate, and convert length
  const lengthPromptMessage = "How long would you like you password to be?\n" +
                              "Please enter a number between 8 and 128.";
  const defaultLength = "20";
  let lengthInput = window.prompt(lengthPromptMessage, defaultLength);
  let lengthValidated = validateLengthInput(lengthInput);
  while (typeof lengthValidated != "number" && lengthValidated !== null) {
    lengthInput = window.prompt(lengthValidated + "\n\n" + lengthPromptMessage,
                                defaultLength);
    lengthValidated = validateLengthInput(lengthInput);
  }

  //if the user hit cancel, then just return null; otherwise put the length into the object to be returned
  if (lengthValidated === null) {
    return null;
  } else {
    options.length = lengthValidated;
  } 

  // prompt for types of characters to include
  options.includeLower = false;
  options.includeUpper = false;
  options.includeNumeric = false;
  options.includeSpecial = false;
  let promptedCharacterTypes = false; //acts as a flag for whether or not to tell the user they failed input validation.
  while (!(options.includeLower   || 
           options.includeUpper   || 
           options.includeNumeric || 
           options.includeSpecial)) // loop until at least one option is selected.
  {
    if (promptedCharacterTypes) {
      window.alert("You need to include at least one type of characters.")
    }
    options.includeLower = window.confirm("Would you like to include lower case letters?");
    options.includeUpper = window.confirm("Would you like to include upper case letters?");
    options.includeNumeric = window.confirm("Would you like to include numerals?");
    options.includeSpecial = window.confirm("Would you like to include special characters?");
    promptedCharacterTypes = true;
  }

  return options
}


/* Validates input for password length.
   Returns a value of type Number representing the length entered if input is valid.
   Returns a value of type String if input is invalid. The string describes the
   reason the input was invalid.
   Returns null if inputString is null.
 */
function validateLengthInput(inputString) {
  if (inputString === null) return null;

  let length = parseInt(inputString.trim());
  if (isNaN(length)) {
    return "The text you entered could not be converted to a number.";
  } else if (length < 8 || length > 128) {
    return "The number you entered was not between 8 and 128.";
  } else {
    return length;
  }
} 

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
