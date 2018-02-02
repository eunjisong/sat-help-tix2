const chai = require('chai');
const expect = chai.expect;
const Promise = require('bluebird');
const Students = require('../db/models/students');
const Tests = require('../db/models/tests');
const db = require('../db/db');

describe('The `Test` model', function() {
  //initial force sync to clear the db
  before(() => db.sync({ force: true }));

  let test;
  let subject = 'Tree-climbing';
  let grade = 79;

  beforeEach(() => {
    test = Tests.build({
      subject,
      grade
    });
  });

  afterEach(() => {
    Tests.truncate({ cascade: true });
  });

  describe('attributes definition', () => {
    it('includes `subject` and `grade` fields', () => {
      return test.save().then(savedTest => {
        expect(savedTest.subject).to.equal('Tree-climbing');
        expect(savedTest.grade).to.equal(79);
      });
    });

    it('requires `subject`', () => {
      test.subject = null;
      return test.validate().then(
        () => {
          throw new Error('validation should fail when subject is null');
        },
        createdError => expect(createdError).to.be.an.instanceOf(Error)
      );
    });

    it('requires `grade`', () => {
      test.grade = null;
      return test.validate().then(
        () => {
          throw new Error('validation should fail when grade is null');
        },
        createdError => expect(createdError).to.be.an.instanceOf(Error)
      );
    });
    //end of `attributes definition` describe block
  });

  describe('class methods', () => {
    beforeEach(() => {
      return Promise.all([
        Tests.create({ subject: 'Outdoor Survival', grade: 67 }),
        Tests.create({ subject: 'Competitive Eating', grade: 92 }),
        Tests.create({ subject: 'Javascript 101', grade: 98 }),
        Tests.create({ subject: 'Wind Surfing', grade: 52 }),
        Tests.create({ subject: 'Outdoor Survival', grade: 90 })
      ]);
    });

    describe('passing', () => {
      it('should return the test instances that have grade greater than 70', () => {
        return Tests.passing().then(foundTests => {
          expect(foundTests).to.be.an.instanceOf(Array);
          expect(foundTests).to.have.length(3);
        });
      });
    });
    describe('findBySubject', () => {
      it('should return all instances by given subject', () => {
        return Tests.findBySubject('Outdoor Survival').then(foundTests => {
          expect(foundTests).to.be.an.instanceOf(Array);
          expect(foundTests).to.have.length(2);
        });
      });
    });
  });

  describe('associations', () => {
    it('belongs to a student', () => {
      const newStudent = Students.create({
        firstName: 'Pepper',
        lastName: 'Potts',
        email: 'pp@salsa.com'
      });
      const newTest = Tests.create({
        subject: 'sword-sharpening',
        grade: 100
      });
      return Promise.all([newStudent, newTest])
        .spread((createdStudent, createdTest) => {
          return createdTest.setStudent(createdStudent);
        })
        .then(() => {
          return Tests.findOne({
            where: { subject: 'sword-sharpening' },
            include: { model: Students }
          });
        })
        .then(foundTest => {
          expect(foundTest).to.exist; //eslint-disable-line no-unused-expressions
          expect(foundTest.student.fullName).to.equal('Pepper Potts');
        });
    });
  });
});
