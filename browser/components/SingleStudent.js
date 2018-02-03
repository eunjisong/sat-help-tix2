import React, { Component } from 'react';

const SingleStudent = ({ fullName, tests }) =>
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

export default SingleStudent