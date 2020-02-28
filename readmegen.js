var inquirer = require('inquirer');
var util = require('util');
var fs = require('fs');
var axios = require('axios');
inquirer.prompt([
    {
        type: "input",
        message: "What's the name of your repo?",
        name: "title"
    },
    {
        type: "input",
        message: "Steps for Installation",
        name: "installation"
    },
    {
        type: "input",
        message: "Describe your project.",
        name: "description"
    },
    {
        type: "input",
        message: "Usage for your software:",
        name: "usage"
    },
    {
        type: "input",
        message: "What is one language you used?",
        name: "badges"
    },
    {
        name: "lisence",
        message: "What licence are you using",
        type: "list",
        choices: [
            "MIT",
            "ISC",
            "Microsoft Public License",
            "Mozilla Public License"
        ]
    },
    {
        type: "input",
        message: "Contributors:",
        name: "contribute"
    },
    {
        type: "input",
        message: "What tests did you run?",
        name: "test"
    },
    {
        type: "input",
        message: "What's you GitHub username?",
        name: "userGH"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    }

]).then(response => {
    const queryURL = `https://api.github.com/users/${response.userGH}`
    axios
        .get(queryURL)
        .then(function (userGH) {


            fs.writeFile("exreadme.md", `# ${response.title}
## Description: 
${response.description}
## Table Of Contents:
* How To Install
* Usage
* Technology Used/Badges
* Contributors
* Tests
* GitHub
## How To Install: 
${response.installation}
## Usage:
${response.usage}
## Technologies Used/Bagdes: 
![img](https://img.shields.io/badge/${response.badges}-used-red)
## Lisence:  
${response.lisence}
## Contributors:
${response.contribute}
## Tests:
${response.test}
## GitHub: 
![img](${userGH.data.avatar_url})
${response.email}`, err => {
                if (err) {
                    throw err
                }
                console.log("Readme sucessfully created")
            })
        })
});