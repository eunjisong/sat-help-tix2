import React from 'react';
import SingleStudent from './SingleStudent';

const Students = (props) => {
    //props: {students: array(50), tests: array(6)}
    console.log("props.students: ",props.students)
    return (
        <div>
        <h1>Gradebook:</h1>
        {
            props.students //an array of the students
            .map(student =>
                (
                    <SingleStudent
                    key={student.id}
                    fullName={student.fullName}
                    tests={student.tests}
                    />
                )
            )
        }
        </div>
    )
}

// rendering the list of students 

export default Students
