'use strict';

const chai = require('chai');
const expect = chai.expect;

const Students = require('../db/models/students');
const db = require('../db/db');

describe('The `Students` model', function() {
  //initial force sync to clear the db
  before(() => db.sync({ force: true }));

  //create student BEFORE EACH test
  let student;
  let firstName = 'Peter';
  let lastName = 'Parker';
  let email = 'peterP@spidey.web';

  beforeEach(() => {
    student = Students.build({
      firstName,
      lastName,
      email
    });
  });

  //remove student AFTER EACH test
  //cascade:true `Only used in conjunction with TRUNCATE. Truncates all tables that have foreign-key references to the named table, or to any tables added to the group due to CASCADE`.
  //src: http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-truncate
  afterEach(() => {
    Students.truncate({ cascade: true });
  });

  describe('attributes definition', () => {
    it('includes `firstName`, `lastName`, and `email` fields', () => {
      return student.save().then(savedStudent => {
        expect(savedStudent.firstName).to.equal('Peter');
        expect(savedStudent.lastName).to.equal('Parker');
        expect(savedStudent.email).to.equal('peterP@spidey.web');
      });
    });

    it('requires `firstName`', () => {
      student.firstName = null;
      return student.validate().then(
        () => {
          throw new Error('validation should fail when firstName is null');
        },
        createdError => expect(createdError).to.be.an.instanceOf(Error)
      );
    });

    it('requires `lastName`', () => {
      student.lastName = null;
      return student.validate().then(
        () => {
          throw new Error('validation should fail when lastName is null');
        },
        createdError => expect(createdError).to.be.an.instanceOf(Error)
      );
    });

    it('requires `email`', () => {
      student.email = null;
      return student.validate().then(
        () => {
          throw new Error('validation should fail when email is null');
        },
        createdError => expect(createdError).to.be.an.instanceOf(Error)
      );
    });

    it('requires `email` to be in an email form', () => {
      student.email = 'hola world';
      return student.validate().then(
        () => {
          throw new Error(
            'validation should fail when email is not in email form'
          );
        },
        createdError => {
          expect(createdError).to.be.an.instanceOf(Error);
          expect(createdError.message).to.contain('Validation error');
        }
      );
    });
    //end of `attributes definition` describe block
  });

  describe('options definition', () => {
    describe('`fullName` virtual field', () => {
      it('returns the full name', () => {
        expect(student.fullName).to.equal(`${firstName} ${lastName}`);
      });
    });

    describe('a `pre` create hook', () => {
      let newStudent;
      beforeEach(() => {
        newStudent = Students.build({
          firstName: 'charles',
          lastName: 'xavier',
          email: 'charlie@brainy.com'
        });
      });

      it('capitalizes the first letter of the first and last name before save to the DB', () => {
        return newStudent.save().then(savedStudent => {
          expect(savedStudent.firstName).to.equal('Charles');
          expect(savedStudent.lastName).to.equal('Xavier');
        });
      });
    });
    //end of `options definition` describe block
  });

  describe('instance methods', () => {
    describe('initials', () => {
      it('should return the initials of a student', () => {
        return student.save().then(savedStudent => {
          expect(savedStudent.initials()).to.equal('P P');
        });
      });
    });
  });
  //end of `The Students model` describe block
});
