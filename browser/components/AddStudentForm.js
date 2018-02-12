// smart vs dummy 
// typing on the form means we need local state -> we need to build class component
import React, { Component } from 'react'

export default class AddStudentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log('Name', event.target.name)
        console.log('value', event.target.value)
        this.setState({ [event.target.name] : event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const student = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        } 
        this.props.addStudent(student);
        this.setState({firstName: '', lastName: '', email: ''})
        
    }
    // persisting in db ----> always keep updated!!! 
    // 1. 프리벤트 디폴트를 하라 2. 스테이트에 도는 데이터를 오브젝트에 잡아라 3. 그 스테이트 데이터를 db에 넣어라. 4. 인풋 필드를 클리어하라 

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label >
                    First Name:
                <input name="firstName" value={this.state.firstName} type="text" onChange={this.handleChange} />
                </label>

                <label >
                    Last Name:
                <input name="lastName" value={this.state.lastName} type="text" onChange={this.handleChange} />
                </label>

                <label >
                    Email:
                <input name="email" value={this.state.email} type="email" onChange={this.handleChange} />
                </label>

                <button type="submit">Submit New Student</button>
            </form>
        )
    }
}

// 유저가 타입하려고 하면 그걸 온체인지 하면 된다. 
// name attributes on input field 
// 네임 attribute는 구별하기 위해서 
// value attribute는 새로 저장된 스테이트에 저장하려고 