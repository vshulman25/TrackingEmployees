const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'root',
    database: 'employeetracker',
});
connection.connect((err) => {
    if (err) throw err;
    runSearch();
  });
  
  const runSearch = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'view Dept',
          'view Employee',
          'view Roles',
          'add Dept',
          'add Employee',
          'exit'
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'view Dept':
            viewDept();
            break;
  
          case 'view Employees':
            viewEmployee();
            break;
  
          case 'view Roles':
            viewRoles();
            break;
  
          case 'add Dept':
            addDept();
            break;

            case 'add Employee':
            addEmployee();
            break;
  
          case 'Exit':
            connection.end();
            break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });

      function viewDept() {
          connection.query("SELECT * FROM department", function(err, res){
            if(err) throw err 
            console.table(res)
            runSearch()

            // will repeat for all views 
          })
      }

      const addEmployee = () => {
        connection.query("SELECT * FROM employeerole", (err, res) => {
            if(err) throw err
            inquirer
            .prompt([{
              name: 'firstName',
              type: 'input',
              message: 'Please add employees first name',
            }, {
                name: 'lastName',
                type: 'input',
                message: 'Please add employees last name',
              }, {
                name: 'roleId',
                type: 'rawlist',
                message: 'Select role for employee',
                choices: res.map(item => item.title)
              }
            
            
            ]).then(function (response){
                const selectedRole = res.find(item => item.title === response.roleId)
                connection.query("INSERT INTO employee SET ?", 
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: selectedRole.id

                }, function(err, res){
                    if (err) throw err
                    console.log("added employee" + response.firstName + " " + response.lastName)

                    runSearch()
                })
            })
        })
      }
      






  };
  
