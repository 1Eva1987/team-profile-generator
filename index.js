const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
console.log(OUTPUT_DIR);
const outputPath = path.join(OUTPUT_DIR, "team.html");
console.log(outputPath);
const render = require("./src/page-template.js");
const { template } = require("@babel/core");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const officeTeam = [];

// function to prompt the user to add managers details
const managersPrompt = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Pleas enter the team manager's name: ",
        name: "name",
      },
      {
        type: "input",
        message: "Pleas enter team manager's ID: ",
        name: "id",
      },
      {
        type: "input",
        message: "Pleas enter team managers e-mail address: ",
        name: "email",
      },
      {
        type: "input",
        message: "Pleas enter team managers office number:",
        name: "officeNumber",
      },
    ])
    .then((response) => {
      const manager = new Manager(
        response.name,
        response.id,
        response.email,
        response.officeNumber
      );
      officeTeam.push(manager);
    });
};

// function to get the information about the engineer
const engineerInfo = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is engineer's name?",
        name: "name",
      },
      {
        type: "input",
        message: "Please provide engineer's ID number:",
        name: "id",
      },
      {
        ype: "input",
        message: "Please provide engineer's email address:",
        name: "email",
      },
      {
        ype: "input",
        message: "Please provide engineer's GitHub username:",
        name: "github",
      },
    ])
    .then((response) => {
      const engineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
      officeTeam.push(engineer);
    });
};

// function to get the information about the intern
const internInfo = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is intern's name?",
        name: "name",
      },
      {
        type: "input",
        message: "Please provide intern's ID number:",
        name: "id",
      },
      {
        ype: "input",
        message: "Please provide intern's email address:",
        name: "email",
      },
      {
        ype: "input",
        message: "Please provide eintern's school:",
        name: "school",
      },
    ])
    .then((response) => {
      const intern = new Intern(
        response.name,
        response.id,
        response.email,
        response.school
      );
      officeTeam.push(intern);
    });
};

// function to chose the action
const usersChoice = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "what would you like to do?",
        name: "action",
        choices: [
          "Add an engineer",
          "Add an intern",
          "Finish building the team",
        ],
      },
    ])
    .then((response) => {
      if (response.action === "Add an engineer") {
        engineerInfo().then(() => usersChoice());
      } else if (response.action === "Add an intern") {
        internInfo().then(() => usersChoice());
      } else if (response.action === "Finish building the team") {
        console.log("yuo have finished building your team");
        console.log(officeTeam);
        const finalTeam = render(officeTeam);
        writeToFile("team.htm", finalTeam, (err) =>
          err ? console.log(err) : console.log("done")
        );
      }
    });
};

// functionality to add new tem member to office team array
managersPrompt().then(() => usersChoice());

// function to create file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err ? console.log(err) : console.log("success")
  );
}
