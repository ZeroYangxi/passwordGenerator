"use strict";
let output = "";

document.addEventListener("DOMContentLoaded", function () {
  const generateButton = document.querySelector(".generateButton");
  const outputDiv = document.getElementById("outputDiv");

  // User settings for the checkbox
  let settings = document.querySelectorAll(".option");

  //generate the password when click
  generateButton.addEventListener("click", generatePassword);

  function setting() {
    let charPool = "";
    let noneChecked = true;
    settings.forEach(function (checkbox) {
      if (checkbox.checked) {
        noneChecked = false;
        let checkboxId = checkbox.id;
        switch (checkboxId) {
          case "uppercase":
            charPool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //26
            //console.log(charPool);
            break;
          case "lowercase":
            charPool += "abcdefghijklmnopqrstuvwxyz"; //26
            //console.log(charPool);
            break;
          case "number":
            charPool += "0123456789"; //10
            //console.log(charPool);
            break;
          case "special":
            charPool += "!@#$%^&*()_+[]{}|/\\;:,.<>?"; //25
            //console.log(charPool);
            break;
        }
      }
    });
    if (noneChecked) {
      console.log("None of the checkboxes are checked");
      output =
        "Please check at least one checkbox to decide what to include in the password!";
      charPool = "charPool";
    }

    return {
      charPool,
      noneChecked,
    };
  }

  function generatePassword() {
    const passwordLength = document.getElementById("length");
    const settingsResult = setting();
    const optionCharPool = settingsResult.charPool;
    const noneChecked = settingsResult.noneChecked;
    const charPoolLength = optionCharPool.length; //87 in total
    const totalLength = passwordLength.value;
    console.log("totallength= " + totalLength);

    const keywordInput = document.getElementById("keyword");
    const userInput = keywordInput.value;
    //console.log("userInput = " + userInput);
    const userInputLength = userInput.length;
    let executionFlag = true;

    if (userInputLength >= totalLength) {
      executionFlag = false;
      output =
        "Your password length is less than or equal to your keyword length.";
    }

    if (!noneChecked && executionFlag) {
      // Get a reference to the input element by its ID
      // additional validation to ensure the value is a valid number if needed.

      //console.log("KeywordInput=" + keywordInput);
      const randomLength = totalLength - userInputLength;

      const keywordPosition = Math.floor(Math.random() * totalLength);

      console.log("charPoolLength = " + charPoolLength);
      console.log("UserInput type: " + userInput.type);
      console.log("keywordPosition = " + keywordPosition);

      for (let i = 0; i < keywordPosition && i < randomLength; i++) {
        //if keywordPosition = 0, it would not run
        //generate a random number from 0-86 (charPoolLength - 1)
        let randomIndex = Math.floor(Math.random() * charPoolLength);
        output += optionCharPool[randomIndex];
      }

      if (!noneChecked) output += userInput;

      for (let i = output.length; i < totalLength; i++) {
        //generate a random number from 0-86 (charPoolLength - 1)
        let randomIndex = Math.floor(Math.random() * charPoolLength);
        output += optionCharPool[randomIndex];
      }
    }
    const outputPassword = document.getElementById("output");
    outputPassword.textContent = output;
    output = "";
  }
});
