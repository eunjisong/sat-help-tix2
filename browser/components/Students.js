import React, { Component } from 'react';
import axios from 'axios';


const avg = tests =>
    Math.round(
        tests.map(test => test.grade)
            .reduce((x, y) => x + y) / tests.length
    )

const byTestScoresAsc = (a, b) => avg(a.tests) - avg(b.tests)
const byTestScoresDesc = (a, b) => avg(b.tests) - avg(a.tests)

const Student = ({fullName, tests}) =>
    <div>
      <h3>{fullName} {avg(tests)}%</h3>
      <table>
        <thead>
            <th>subject</th>
            <th>grade</th>
        </thead>
        {
            tests.map(test =>
                <tr key={test.id}>
                    <td>{test.subject}</td>
                    <td>{test.grade}%</td>
                </tr>
            )
        }
    </table>
    </div>

const Students = (props) => {
    console.log(props)
    const {asc} = props
        return (
            <div>
                <h2>Here are the students</h2>
                <p>
                {
                    props.students
                        .sort(asc ? byTestScoresAsc : byTestScoresDesc)
                        .map(student =>
                            <Student
                                key={student.id}
                                /* fullName={student.fullName}
                                tests={student.tests} */
                                {...student} />
                        )
                }
                </p>
            </div>
        );
}

export default Students
