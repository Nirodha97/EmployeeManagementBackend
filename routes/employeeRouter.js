const router = require('express').Router();
let Employee = require('../models/employeeModel');


//All Employee resources are fetched
router.route('/api/v1/employees').get((req, res) => {
    Employee.find()
    .then(employees => res.json(employees))
    .catch(err => res.status(400).json('Error: ' + err));
});


//A new Employee resource is created
router.route('/api/v1/employees').post((req, res) => {
  
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailId = req.body.emailId;

  
    const newEmployee = new Employee({
        firstName,
        lastName,
        emailId,
    });
  
    newEmployee.save()
    .then(() => res.json('Employee added!'))
    .catch(err => res.json('Error: ' + err));
  });


 // One Employee resource is fetched
  router.route('/api/v1/employees/:id').get((req, res) => {
    Employee.findById(req.params.id)
      .then(employees => res.json(employees))
      .catch(err => res.status(400).json('Error: ' + err));
  });




    //Employee resource is Updated
router.route('/api/v1/employees/:id').put((req, res) => {
    Employee.findById(req.params.id)
      .then(employees => {
        employees.firstName = req.body.firstName;
        employees.lastName = req.body.lastName;
        employees.emailId = req.body.emailId;
      
  
        employees.save()
          .then(() => res.json('Employee updated!'))
          .catch(err => res.json('Error: ' + err));
      })
      .catch(err => res.json('Error: ' + err));
  });


  //Employee resource is deleted
  router.route('/api/v1/employees/:id').delete((req, res) => {
    Employee.findByIdAndDelete(req.params.id)
      .then(() => res.json('Employee deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;