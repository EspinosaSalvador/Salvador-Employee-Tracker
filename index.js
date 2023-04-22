const inquirer = require("inquirer");
const mysql = require("mysql2");

// Connect to database

function newQuestion() {
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
          departments();
          break;
        case "view all roles":
          roles();
          break;
        case "view all employees":
          employee();
          break;
        case "add a department":
          addDepartment();
          break;
        case "add a role":
          console.log(answers.menu);
          break;
        case "add an employee":
          console.log(answers.menu);
          break;
        case "update an employee role":
          console.log(answers.menu);
          break;
      }
    });
}
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "Zeuswashere7.7",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

function departments() {
  db.query("select * from department", (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else console.table(result);
    newQuestion();
  });
}

function roles() {
  db.query("select * from role", (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else console.table(result);
    newQuestion();
  });
}
function employee() {
  db.query("select * from employee", (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else console.table(result);
    newQuestion();
  });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "new",
        message: "what do you want to add?",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        [answers.new],
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          } else console.table(result);
          newQuestion();
        }
      );
    });
}
// function roles() {
//   db.query("select * from role", (err, result) => {
//     if (err) {
//       console.log(err);
//       return;
//     } else console.table(result);
//     newQuestion();
//   });
// }

const options = [
  "view all departments",
  "view all roles",
  "view all employees",
  "add a department",
  "add a role",
  "add an employee",
  "update an employee role",
  "exit",
];

newQuestion();
