import React, { Component } from 'react';
import SingleStudent from './SingleStudent';

const Students = (props) => {
    console.log(props)
        return (
            <div>
                <h2>GradeBook:</h2>
                {
                    props.students//an array of the students
                        .map(student =>
                            (
                                <SingleStudent
                                    key={student.id}
                                    /* fullName={student.fullName}
                                    tests={student.tests} */
                                    {...student} 
                                />
                            )
                        )
                }
            </div>
        );
}

export default Students
