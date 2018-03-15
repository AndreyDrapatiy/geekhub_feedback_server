const express = require('express')

const Teacher = require('./model')

const router = express.Router()

router.get('/teacher', (req, res, next) => {
  Teacher.find({})
    .then(data => {
      res.json({data})
    })
    .catch(next)
})

router.post('/teacher', (req, res, next) => {
  new Teacher(req.body.data)
    .save()
    .then(data => {
      res.json({data})
    })
    .catch(next)
})

router.put('/teacher/:id', function (req, res) {
  Teacher.findOneAndUpdate({ "_id": req.params.id}, {
    date: req.body.data.date,
    url: req.body.data.url,
    description: req.body.data.description
    }, { new: true }, function (err, doc) {
      if (err) {
        res.status(400).json(err)
      }
      res.status(200).json(doc)
    })
})

router.delete('/teacher/:id', function (req, res) {
  let id = req.params.id
    Teacher.remove({
    _id: id
  }, function () {
    res.json()
  })
})

module.exports = router