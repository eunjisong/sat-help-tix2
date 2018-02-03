import React, { Component } from 'react';
import axios from 'axios';

const Student = ({fullName, tests}) =>
    <div>
      <h3>{fullName}</h3>
      <div>
            <table>
                <thead>
                    <tr>
                        <th>subject</th>
                        <th>grade</th>
                    </tr>
                </thead>
            <tbody>
                {
                    tests.map((test) => 
                        <tr key={test.id}>
                            <td>{test.subject}</td>
                            <td>{test.grade}%</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    </div>

const Students = (props) => {
    console.log(props)
        return (
            <div>
                <h2>Here are the students</h2>
                {
                    props.students
                        .map(student =>
                            (
                                <Student
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
