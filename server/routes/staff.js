const express = require('express');
const router = express.Router();
const Staff  = require('../models/staff');

router.get('/', (req, res) => {
  if(req.query.q){
    req.query.$text = { $search : req.query.q } ;
    delete req.query.q;
  }
  Staff.find(req.query,{ score : { $meta : 'textScore' } })
    .sort({ score : { $meta : 'textScore' } })
    .then(data => res.status(200).json(data))
    .catch(error => {
      if(error.name === "ValidationError"){
        res.status(400).json(error.errors);
      } else {
        res.sendStatus(500);
      }
    }
  );
});

router.get('/:id', (req, res) => {
  Staff.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => {
        if(error.name === "CastError"){
          res.status(400).json(error.errors);
        } else {
          res.sendStatus(500);
        }
      }
    );
});

router.delete('/:id', (req, res) => {
  Staff.findOneAndRemove({field: 'newValue'})
    .then(data => res.status(200).json(data))
    .catch(error => {
        if(error.name === "CastError"){
          res.status(400).json(error.errors);
        } else {
          res.sendStatus(500);
        }
      }
    );

});

router.post('/', (req,res) => {
  const staff = new Staff(req.body);

  staff.save().then(data => res.status(201).json(data))
    .catch(error => {
        if(error.name === "ValidationError"){
          res.status(400).json(error.errors);
        } else {
          res.sendStatus(500);
        }
      }
    )
});

module.exports = router;