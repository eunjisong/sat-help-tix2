const Test = require('./tests')
const Student = require('./students')

Test.belongsTo(Student)

module.exports = {
  Test,
  Student
}
