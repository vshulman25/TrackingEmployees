USE employeetracker;

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Vickee", "Shulman", 1, 1),("Bob", "Smith", 2, NULL)

-- will repeat for all employees

INSERT INTO employeerole
(title, salary, department_id)
VALUES 
("manager", 100000, 1)

-- will repeat for all employee roles

INSERT INTO department
(deptname)
VALUES
("First Dept")