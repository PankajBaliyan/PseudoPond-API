// employees.route.js
const express = require('express');
const router = express.Router();
const {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/employees-controllers');

// GET all employees
router.get('/employees', getAllEmployees);

// GET one employee by id
router.get('/employees/:id', getEmployeeById);

// POST create n new employee's
router.post('/employees/create/:id', createEmployee);

// PUT update an existing employee
router.put('/employees/:id', updateEmployee);

// DELETE delete an employee
router.delete('/employees/:id', deleteEmployee);

module.exports = router;