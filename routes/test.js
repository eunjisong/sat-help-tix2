const router = require('express').Router()
const Test = require('../db/models').Test
const Student = require('../db/models').Student

router.get('/passing', function (req, res, next) {
  Test.passing()
  .then(tests => res.status(200).json(tests))
  .catch(next)
})

router.get('/', function (req, res, next) {
  Test.findAll()
  .then(tests => res.json(tests))
  .catch(next)
})

router.get('/:id', function (req, res, next) {
  Test.findById(req.params.id)
  .then(test => res.status(200).json(test))
  .catch(next)
})

router.post('/', function(req, res, next) {
  let studentInstance;
  Student.findOne({
    where: {
      id: req.body.studentId
    }
  })
  .then(student => {
    studentInstance = student
    return Test.create(req.body)
  })
  .then(test => {
    test.setStudent(studentInstance)
    res.status(201).json(test)
  })
  .catch(next)
})

router.delete('/:id', function (req, res, next) {
  Test.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.send('deleted!'))
  .catch(next)
})

module.exports = router;
