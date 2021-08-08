// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {
  // Prompt for, validate, and convert length
  const lengthPromptMessage = "How long would you like you password to be?\n" +
                              "Please enter a number between 8 and 128.";
  const defaultLength = "20";
  let lengthInput = window.prompt(lengthPromptMessage, defaultLength);
  let lengthValidated = validateLengthInput(lengthInput);
  while (typeof lengthValidated != "number") {
    lengthInput = window.prompt(lengthValidated + "\n\n" + lengthPromptMessage,
                                defaultLength);
    lengthValidated = validateLengthInput(lengthInput);
  }

  // prompt for types of charactes to include
  let includeLower = false;
  let includeUpper = false;
  let includeNumeric = false;
  let includeSpecial = false;
  let promptedCharacterTypes = false; 
  while (!(includeLower || includeUpper || includeNumeric || includeSpecial)) {
    if (promptedCharacterTypes) {
      window.alert("You need to include at least one type of characters.")
    }
    includeLower = window.confirm("Would you like to include lower case letters?");
    includeUpper = window.confirm("Would you like to include upper case letters?");
    includeNumeric = window.confirm("Would you like to include numerals?");
    includeSpecial = window.confirm("Would you like to include special characters?");
    promptedCharacterTypes = true;
  }

  // construct list of characters to select from
  let eligibleChars = "";
  if (includeLower) eligibleChars += "abcdefghijklmnopqrstuvwxyz";
  if (includeUpper) eligibleChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeNumeric) eligibleChars += "0123456789";
  if (includeSpecial) eligibleChars += " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  // construct password by selecting from eligibleChars
  let password = "";
  for (let i = 0; i < lengthValidated; i++) {
    let charIndex = Math.floor(Math.random() * eligibleChars.length);
    password += eligibleChars.charAt(charIndex);
  }

  return password;
}

/* Validates input for password length.
   Returns a value of type Number representing the length entered if input is valid.
   Returns a value of type String if input is invalid. The string describes the
   reason the input was invalid.
 */
function validateLengthInput(inputString) {
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
