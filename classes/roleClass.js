class Role {
    constructor (id, title, salary, department_id) {
        id = this.id;
        title = this.title;
        salary = this.salary;
        department_id = this.department_id;
    }

    getId() {
        return this.id;
    };

    getTitle() {
        return this.title;
    };

    getSalary() {
        return this.salary;
    };

    getDept() {
        return this.department_id;
    };
};

module.exports = Role;