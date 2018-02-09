import React, { Component } from "react";
import axios from "axios";
import Students from "./Students.js";
import NewStudentForm from "./NewStudentForm.js";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      showForm: false
    };
    this.addStudent = this.addStudent.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  componentDidMount() {
    //state is always set initially (toms 1st law)
    //this calls it to be set again after initial render
    this.getStudents();
  }

  getStudents() {
    axios
      .get("/student")
      .then(res => this.setState({ students: res.data }))
      .catch(console.error);
  }

  addStudent(student) {
    axios
      .post("/student",  student )
      .then(res => {
        return res.data;
      })
      .then(studentObj => {

        this.setState({ students: [...this.state.students, studentObj] });
        //this.setState({ students: this.state.students.concat(student)})
      });
  }

  renderForm() {
    this.setState({ showForm: !this.state.showForm });
  }

  render() {

    return (
      <div>
        <div>
          <h1>Happy Saturday!</h1>
          <button onClick={() => this.renderForm()}>

            + Student
          </button>
          {this.state.showForm ? (
            <NewStudentForm
              addStudent={this.addStudent}
              renderForm={this.renderForm}
            />
          ) : null}
          <Students students={this.state.students} />
        </div>
      </div>
    );
  }
}
