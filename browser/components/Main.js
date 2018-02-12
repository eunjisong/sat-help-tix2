import React, {Component} from 'react';
import axios from 'axios';
import Students from './Students.js'
import AddStudentForm from './AddStudentForm.js'

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            students: [], 
            showForm: false
        }
        this.getStudents = this.getStudents.bind(this)
        this.toggleForm = this.toggleForm.bind(this)
        this.addStudent = this.addStudent.bind(this)
    }

    componentDidMount(){//state is always set initially (toms 1st law)
                        //this calls it to be set again after initial render
        this.getStudents()
    }

    getStudents(){
        axios.get('/student')
        .then(res => this.setState({students: res.data}))
        .catch(console.error)
    }

    addStudent(student){
        axios.post('/student', student)
        .then( res => res.data )
        .then( newStudent => this.setState( {students: [...this.state.students, newStudent]}) )
        .catch(console.error);
    }
 // ... <-- 데이터만 쏙 가져와라 
 
    toggleForm(){
        this.setState({showForm: !this.state.showForm})
        
    }

// onClinc = {this.toggleForm} <--- must bind up in the constructor 
// onClick = {this.toggleForm.bind(this)} <--- bind in the place
// onClick = {() => this.toggleForm()}  <--- no need to use bind up in the constructor (arrow function does binding for us)

// we need to use boolean 
    render(){
        return (
            <div>
                <h1>Happy Saturday!</h1>
                <button onClick={this.toggleForm}>Add Student</button>
                {
                    this.state.showForm ? ( <AddStudentForm addStudent={this.addStudent}/>) : null // prop에 메소드를 넣어라. 왜냐면 차일드가 프랍 메쏘드가 필요하니까. 차일드가 그 메소드를 사용할때 this.props.addStudent로 사용한다. 
                }
                <Students students={this.state.students} />
            </div>
        )
    }
}
