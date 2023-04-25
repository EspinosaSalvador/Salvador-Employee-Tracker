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
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
        case "update an employee role":
          updateEmployee();
          break;
        case "exit":
          exit();
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
        message: "what department do you wish to add?",
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
function addRole() {
  db.query("SELECT * FROM department", (err, departments) => {
    if (err) {
      console.log(err);
      return;
    }

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What role do you wish to add?",
        },
        {
          type: "number",
          name: "salary",
          message: "What salary does this role have? (Please use numbers)",
        },
        {
          type: "list",
          name: "department_id",
          message: "What department does this belong to?(Choose from the list)",
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ])
      .then((answers) => {
        db.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [answers.title, answers.salary, answers.department_id],
          (err, result) => {
            if (err) {
              console.log(err);
              return;
            } else console.table(result);
            newQuestion();
          }
        );
      });
  });
}

function addEmployee() {
  db.query("SELECT * FROM employee", (err, employees) => {
    if (err) {
      console.log(err);
      return;
    }
    db.query("SELECT * FROM role", (err, roles) => {
      if (err) {
        console.log(err);
        return;
      }
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "Whats the first name of the employee?",
          },
          {
            type: "input",
            name: "lastName",
            message: "Whats the last name of the employee?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What role does this employee has in the company?",
            choices: roles.map((role) => ({
              name: role.title,
              value: role.id,
            })),
          },
          {
            type: "list",
            name: "manager_id",
            message:
              "is this employee a manager? or does it have a manager?(please choose an employee)",
            choices: employees.map((employee) => ({
              name: employee.first_name + " " + employee.last_name,
              value: employee.id,
            })),
          },
        ])
        .then((answers) => {
          db.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [
              answers.firstName,
              answers.lastName,
              answers.role_id,
              answers.manager_id,
            ],
            (err, result) => {
              if (err) {
                console.log(err);
                return;
              } else console.table(result);
              newQuestion();
            }
          );
        });
    });
  });
}
function updateEmployee() {
  db.query("SELECT * FROM employee", (err, employees) => {
    if (err) {
      console.log(err);
      return;
    }
    db.query("SELECT * FROM role", (err, roles) => {
      if (err) {
        console.log(err);
        return;
      }
      inquirer
        .prompt([
          {
            type: "list",
            name: "role_id",
            message: "Whats the role of the employee?",
            choices: roles.map((role) => ({
              name: role.title,
              value: role.id,
            })),
          },
          {
            type: "list",
            name: "employee_id",
            message: "who is the employee that needs to be updated?",
            choices: employees.map((employee) => ({
              name: employee.first_name + " " + employee.last_name,
              value: employee.id,
            })),
          },
        ])
        .then((answers) => {
          db.query(
            "UPDATE employee SET role_id = ? where id = ?",
            [answers.role_id, answers.employee_id],
            (err, result) => {
              if (err) {
                console.log(err);
                return;
              } else console.table(result);
              newQuestion();
            }
          );
        });
    });
  });
}

function exit() {
  console.log("Thanks for using my application");
  process.exit();
}
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
