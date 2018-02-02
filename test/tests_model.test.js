const chai = require('chai');
const expect = chai.expect;

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

  //end of `The Students model` describe block
});
