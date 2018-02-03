'use strict'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db');

const Test = db.define('test', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
    },
  grade: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Test.passing = function() {
  return Test.findAll({
    where: {
      grade: {
        [Op.gt]: 70
      }
    }
  })
}

Test.findBySubject = function(type){
  return Test.findAll({
    where: {
      subject: type
    }
  })
}

module.exports = Test

const Student = require('./students')
Test.belongsTo(Student)
