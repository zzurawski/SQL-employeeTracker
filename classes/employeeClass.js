class Employee {
    constructor(id, first_name, last_name, role_id, manager_id) {
        id = this.id;
        first_name = this.first_name;
        last_name = this.last_name;
        role_id = this.role_id;
        manager_id = this.manager_id;
    };

    getId() {
        return this.id
    };

    getFirstName() {
        return this.first_name
    };

    getLastName() {
        return this.last_name
    };

    getRole() {
        return this.role_id
    };

    getManager() {
        return this.manager_id
    };
}

module.exports = Employee;