USE company_db;

INSERT INTO department (name)
VALUES ("Maketing"),
       ("Finance"),
       ("R&D"),
       ("HR"),
       ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Lead", 100,1),
       ("Finance Lead", 300,2),
       ("R&D Lead", 50,3),
       ("HR Lead", 200,4),
       ("Engineer Lead", 600,5);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("juan", "perez", 1,NULL),
       ("juanita","espinosa", 2,1),
       ("Fabrizio", "trevino", 3,1),
       ("Mauricio", "trevino", 4,1),
       ("Mariana", "trevino", 5,1);
