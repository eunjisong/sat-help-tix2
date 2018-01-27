npm init
npm i body-parser morgan express sequelize pg --save

student - get passing tests for particular student
class method - Student.getallpassing

post-man:
body - raw - json(application/json)

Test:
Fields
verification
Virtual - getter XXXXXX
Instance and Class methods
- one async XXX
- one messing w/string XXXX
Set up association - belongsTo XXXX
Server HOOK
Operator XXXX
destroy XXXX

Routes
---get everything XXXX
---findById /:id XXX
---Set status XXX
---Post XXXX
---Put XXXX
---Tests passing param XXXX
---Bring up docs XXXX
---set test's student XXXXXX
____________
Requirements: Create MD File
(Utilize Volleyball)
app.js

List of requirements

Express - Using models and routes
Defining Models

_______

Student Model:
First Name
-String
-Do not allow Null value
Last Name
-String
-Do not allow Null value
Email
-String
-Do not allow Null value
-Validate data is in fact email
Hook
-Before validate, capitalize first letter in first name and last name values

Instance Methods:
getTests
-Finds all tests associated with particular student
getInitials
-Returns students initials

_______

Test Model:
subject
-String
-Do not allow Null value
grade
-String
-Do not allow Null value

Class Methods:
passing
-Returns all tests with grade above 70
findByType
-Returns all tests for a particular subject

_______

Student Routes:
W-Get all students, send back instance of students along with status of 200
-Get all tests associate with a particular student (uses student id), set status of 200
W-Post a new student - send back instance of new student along with status of 201
W-update a student
W-delete student,
_______

Test Routes:
W-Get all tests, send back instance of students along with status of 200
W-Get all tests with passing grades, send back status 200 along with instances of passing tests
W-Get test by id, set status as 201 and return instance of test
W-Post a new test, use route indicating the id of the student that took the test, create new test and associate / place the studentId on the table with the tst
-Delete test
