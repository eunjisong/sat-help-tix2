const Sequelize = require('sequelize')
const db = require('../db')
const Test = require('./tests')

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
    }
  }
})

Student.prototype.getTests = function(){
  return Test.findAll({
    where: {
      studentId: this.id
    }
  })
}

Student.prototype.initials = function () {
  return `${this.firstName[0].toUpperCase()} ${this.lastName[0].toUpperCase()}`;
}

module.exports = Student;

