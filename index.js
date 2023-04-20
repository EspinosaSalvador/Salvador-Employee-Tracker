const inquirer = require("inquirer");
const mysql = require("mysql2");

const options = [
  "view all departments",
  "view all roles",
  "view all employees",
  "add a department",
  "add a role",
  "add an employee",
  "update an employee role",
];
inquirer
  .prompt([
    {
      type: "list",
      name: "menu",
      message: "what do you want to do?",
      choices: options,
    },
  ])
  .then((answers) => {
    switch (answers.menu) {
      case "view all departments":
        console.log(answers.menu);
        break;
        case
    }
  });
