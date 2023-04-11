INSERT INTO department (id, name)
VALUES  (01, 'Engineering'),
        (02, 'Marketing'),
        (03, 'Supervisors'),
        (04, 'Finance');

INSERT INTO role (id, title, salary, department_id)
VALUES  (01, 'CEO', 200.000, 03),
        (02, 'Systems Engineer', 90.000, 01),
        (03, 'Accountant', 66.000, 04),
        (04, 'Social Media Manager', 40.000, 02),
        (05, 'Programmer I', 60.000, 01),
        (06, 'Team Supervisor', 95.000, 03);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (01, 'Matt', 'Yeager', 03, NULL),
        (02, 'Sean', 'McDonnell', 04, 03),
        (03, 'Zach', 'Zurawski', 01, NULL),
        (04, 'Tigran', 'Klekchyan', 05, 05),
        (05, 'William', 'Pei', 02, NULL),
        (06, 'Matt', 'Gildone', 06, 03);