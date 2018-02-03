import React from 'react';

const avgGrade = tests => {
    return (
        Math.round(
    tests.map(test => test.grade)
    .reduce((x, y) => x + y) / tests.length
    ))
}

const SingleStudent = ({fullName, tests}) =>
   ( <div>
        <h3>{fullName}</h3>
        <h3>Average grade: {avgGrade(tests)}%</h3>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Average</th>
                    </tr>
                </thead>
                <tbody>
                {
                    tests.map((test) => {
                        return (
                            <tr key={test.id}>
                                <td>{test.subject}</td>
                                <td>{test.grade}%</td>
                            </tr>
                        )
                    }
                    )
                }
                </tbody>
            </table>
        </div>
    </div>)


export default SingleStudent
