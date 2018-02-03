import React, {Component} from 'react';
import axios from 'axios';
import Students from './Students.js'

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            students: []
        }
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

    render(){
        return (
            <div>
                <h1>Happy Saturday!</h1>
                <Students students={this.state.students} />
            </div>
        )
    }
}
