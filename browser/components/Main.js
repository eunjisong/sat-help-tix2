import React, { Component } from 'react';
import Students from './Students.js';
import axios from 'axios'


//have state in here holding everything and then import everything here
export default class Main extends Component {

    constructor(props){
        super(props)//need this to keep the context of this
        this.state = {
            students: []
        }
    }

    componentDidMount(){
        this.getStudents()
    }


    getStudents() {
        axios.get(`/student`)
            .then(res => {
                this.setState({
                    students: res.data
            })})
            .catch(console.error)
    }


    render() {
        if (!this.state) return 'loading...'
        console.log(this.state)
        return (
            <div>
                <h1>Hello Students!</h1>
                <Students asc={false} students={this.state.students} />
            </div>
        )
    }
}