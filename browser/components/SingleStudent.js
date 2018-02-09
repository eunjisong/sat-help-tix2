import React, { Component } from "react";

export default class SingleStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGrades: false
    };
    this.avgGrade = this.avgGrade.bind(this);
    this.showGradesList = this.showGradesList.bind(this);
  }

  avgGrade(tests = []) {
    return Math.round(
      tests.map(test => test.grade).reduce((x, y) => x + y, 0) / tests.length
    );
  }

  showGradesList() {
    this.setState({ showGrades: !this.state.showGrades });
  }

  render() {
    const { fullName, tests } = this.props;
    return (
      <div>
        <h3>{fullName}</h3>
        {(!tests || (Array.isArray(tests) && !tests.length))? null : <button onClick={this.showGradesList}>Grades</button>}

        {this.avgGrade(tests) ? (
          <h3>Average Grade: {this.avgGrade(tests)}%</h3>
        ) : null}
        {this.state.showGrades && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(tests) ? (
                  tests.map(test => {
                    return (
                      <tr key={test.id}>
                        <td>{test.subject}</td>
                        <td>{test.grade}%</td>
                      </tr>
                    );
                  })
                ) : null}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
