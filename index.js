const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

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

//  start app questions 
const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'view Dept',
        'view Employee',
        'view Roles',
        'add Dept',
        'add Employee',
        'add Role',
        'Exit'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'view Dept':
          viewDept();
          break;

        case 'view Employee':
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

        case 'add Role':
          addRole();
          break;

        // case 'update Employee Role':
        //     updateRole();
        //     break;

        case 'Exit':
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });


  // views for department, employees and roles 

  const viewDept = () => {
    let query = 'SELECT * FROM department'
    connection.query(query, (err, res) => {
      res.forEach(({ id, deptname }) => {
        console.table([
          {
            id: `${id}`,
            department: `${deptname}`
          }
        ]);
      })
      runSearch()
    })
  }

  const viewEmployee = () => {
    let query =
      'SELECT employee.id, employee.first_name, employee.last_name, employeerole.title FROM '
    query +=
      'employee LEFT JOIN employeerole ON (employee.id = employeerole.id)'
    connection.query(query, (err, res) => {
      if (err) throw err;
      res.forEach(({ id, first_name, last_name, title }) => {
        // if (name === null) {
        //   name = 'Manager needed'
        // }
        console.table([
          {
            ID: `${id}`,
            Name: `${first_name} ${last_name}`,
            Title: `${title}`
            // Manager: `${name}`
          }
        ]);
      });

      runSearch();
    });
  };



  function viewRoles() {
    connection.query("SELECT * FROM employeerole", (err, res) => {
      if (err) throw err
      console.table(res)
      runSearch()

    })
  }

  // adding employees 

  const addEmployee = () => {
    connection.query("SELECT * FROM employeerole", (err, res) => {
      if (err) throw err
      inquirer
        .prompt([{
          name: 'id',
          type: 'input',
          message: 'Please provide the employees id',
        },
        {
          name: 'firstName',
          type: 'input',
          message: 'Please add employees first name',
        },
        {
          name: 'lastName',
          type: 'input',
          message: 'Please add employees last name',
        }, {
          name: 'roleId',
          type: 'input',
          message: 'Please add the role id number',
        }, {
          name: 'managerId',
          type: 'input',
          message: 'Please provide the employees manager id',
        },


        ]).then((response) => {
          console.log(response);
          // res.find(item => item.title === response.roleId)
          connection.query("INSERT INTO employee SET ?",
            {
              first_name: response.firstName,
              last_name: response.lastName,
              role_id: response.role_id

            }, function (err, res) {
              if (err) throw err
              console.log("added employee" + response.firstName + " " + response.lastName)

              runSearch()
            })
        })
    })
  }


  const addDept = () => {
    inquirer
      .prompt([{
        name: 'id',
        type: 'input',
        message: 'Please add an id for your new department',
      }, {
        name: 'department',
        type: 'input',
        message: 'Please give a name for your new department',
      }

      ]).then((response) => {
        console.log(response)
        const query = connection.query
          ('INSERT INTO department SET ?',
            {
              id: response.id,
              deptname: response.department

            }, (err, res) => {
              console.log(err)
              console.log("New department added" + " " + response.department)

              runSearch()
            })
      })
    console.table(res)
  }

  const addRole = () => {
    inquirer
      .prompt([{
        name: 'id',
        type: 'input',
        message: 'Please add an id for your new role',
      }, {
        name: 'title',
        type: 'input',
        message: 'Please give a title for your new role',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Provide a great big salary for your new role',
      }

      ]).then((response) => {
        console.log(response)
        const query = connection.query
          ('INSERT INTO employeerole SET ?',
            {
              id: response.id,
              title: response.title,
              salary: response.salary

            }, (err, res) => {
              console.log(err)
              console.log("New role added" + " " + response.title)

              runSearch()
            })
      })

      // const updateRole = () => {
      //   inquirer
      //   .prompt (
      //     [{
      //       name

      //     }]
      //   )
      //   const query = connection.query(
      //     'UPDATE products SET ? WHERE ?',
      //     [
      //       {
      //         quantity: 100,
      //       },
      //       {
      //         flavor: 'Rocky Road',
      //       },
      //     ],
      //     (err, res) => {
      //       if (err) throw err;
      //       console.log(`${res.affectedRows} products updated!\n`);
      //       // Call deleteProduct AFTER the UPDATE completes
      //       deleteProduct();
      //     }
      //   );
      
      //   // logs the actual query being run
      //   console.log(query.sql);
      // }
  }







};
