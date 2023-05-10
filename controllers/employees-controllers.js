const Employee = require('../models/employees-model');
const casual = require('casual');
const notifier = require('node-notifier')

// GET all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET one employee by id
const getEmployeeById = async (req, res) => {
    let employee;
    try {
        employee = await Employee.findById(req.params.id);
        if (employee == null) {
            return res.status(404).json({ message: 'Cannot find employee' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.json(employee);
};

// Middleware function to get highest id & return it
async function getNextEmployeeId() {
    try {
        const maxEmployeeIdDoc = await Employee.find().sort({ employeeId: -1 }).limit(1);
        const nextEmployeeID = maxEmployeeIdDoc.length > 0 ? maxEmployeeIdDoc[0].employeeId + 1 : 1;
        return nextEmployeeID;
    } catch (err) {
        console.error('Error getting the next employee ID', err);
        return 1
    }
}

// CREATE new employee
const createEmployee = async (req, res) => {
    const id = req.params.id
    try {
        const employees = [];
        let employeeId = await getNextEmployeeId();
        for (let i = 0; i < id; i++) {

            const employee = {
                employeeId,
                firstName: casual.first_name,
                lastName: casual.last_name,
                email: casual.email,
                address: casual.address,
                department: casual.random_element(['Sales', 'Marketing', 'Engineering', 'Finance']),
                salary: casual.integer(from = 20000, to = 100000),
                hireDate: casual.date('YYYY-MM-DD'),
                phoneNumber: casual.phone,
                jobTitle: casual.word,
            };
            employees.push(employee);
            employeeId = employeeId + 1
        }

        // Sort the employees array by employeeId
        employees.sort((a, b) => a.employeeId - b.employeeId);

        // loop through the array of employees and use the create method to add each employee to the database
        try {
            await Employee.insertMany(employees);
            console.log('Employees added successfully to the database');
            notifier.notify({
                title: 'New Notification',
                message: 'Employees Added Successfully!'
            });
            res.send('Employees added successfully to the database')
        } catch (err) {
            console.error('Error adding Employees to the database', err);
            res.send('Error creating Employees DataBase')
        }
    } catch (error) {
        console.log("error", error)
    }
};

// UPDATE employee by id
const updateEmployee = async (req, res) => {
    // try {
    //     const updatedEmployee = await Employee.findByIdAndUpdate(
    //         req.params.id,
    //         req.body,
    //         { new: true }
    //     );
    //     res.json(updatedEmployee);
    // } catch (err) {
    //     res.status(400).json({ message: err.message });
    // }
    // UPDATE an employee by ID
    // router.patch('/:id', getEmployee, async (req, res) => {
    //     if (req.body.firstName != null) {
    //         res.employee.firstName = req.body.firstName;
    //     }

    //     if (req.body.lastName != null) {
    //         res.employee.lastName = req.body.lastName;
    //     }

    //     if (req.body.jobTitle != null) {
    //         res.employee.jobTitle = req.body.jobTitle;
    //     }

    //     if (req.body.department != null) {
    //         res.employee.department = req.body.department;
    //     }

    //     if (req.body.hireDate != null) {
    //         res.employee.hireDate = req.body.hireDate;
    //     }

    //     if (req.body.salary != null) {
    //         res.employee.salary = req.body.salary;
    //     }

    //     if (req.body.location != null) {
    //         res.employee.location = req.body.location;
    //     }

    //     try {
    //         const updatedEmployee = await res.employee.save();
    //         res.json(updatedEmployee);
    //     } catch (err) {
    //         res.status(400).json({ message: err.message });
    //     }
    // });
};

// DELETE employee by id
const deleteEmployee = async (req, res) => {
    // try {
    //     const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    //     res.json(deletedEmployee);
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }
    // DELETE an employee by ID
    // router.delete('/:id', getEmployee, async (req, res) => {
    //     try {
    //         await res.employee.remove();
    //         res.json({ message: 'Employee deleted' });
    //     } catch (err) {
    //         res.status(500).json({ message: err.message });
    //     }
    // });
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
