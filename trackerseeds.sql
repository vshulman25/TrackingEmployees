USE employeetracker;

INSERT INTO manager
(id, first_name, title, deptname)
VALUES
(1, "Nick", "Director", "SHEILD"),
(2, "Agatha", "Sorceress", "SALEMSEVEN"),
(3, "Tony", "CEO", "STARKINT");


INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Nick", "Fury", 1, NULL),
("Thor", "Oden", 2, 1),
("Steve", "Rogers", 3, 1),
("Agatha", "Harkness", 4, NULL),
("Wanda", "Maximoff", 5, 2),
("Vision", "Jarvis", 6, 2),
("Tony", "Stark", 7, NULL),
("Peter", "Parker", 8, 3),
("Bruce", "Banner", 9, 3);

-- will repeat for all employees

INSERT INTO employeerole
(id, title, salary, department_id)
VALUES 
(1, "Director", 200000, 1),
(2, "God Of Thunder", 150000, 1),
(3, "Captain America", 100000, 1),
(4, "Sorceress", 300000, 2),
(5, "Scarlet Witch", 150000, 2),
(6, "Android", 100000, 2),
(7, "CEO", 200000, 3),
(8, "Spider Man", 100000, 3),
(9, "Hulk", 150000, 3);

;

-- will repeat for all employee roles

INSERT INTO department
(id, deptname)
VALUES
(1, "SHIELD"),
(2, "SALEMSEVEN"),
(3, "STARKINT");
