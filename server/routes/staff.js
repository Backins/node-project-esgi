const express = require('express');
const router = express.Router();
const Staff  = require('../models/staff');

router.get('/', (req, res) => {
  Staff.find().then(data => res.json(data));
});

router.post('/', (req,res) => {
  const staff = new Staff(req.body);

  staff.save().then(data => res.status(201).json(data)
    .catch(error => {
        if(error.name === "ValidationError"){
          res.status(400).json(error.errors);
        } else {
          res.sendStatus(500);
        }
      }
    ))
});

module.exports = router;