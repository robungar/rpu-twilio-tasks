import React, { Component } from 'react'

class CreateTask extends Component {

	constructor(){
		super()
		this.state = {
			task: {
				title: '',
				description: '',
				category: 'delivery'
			}
		}
	}

	updateTask(event){
		event.preventDefault()
		let updated = Object.assign({}, this.state.task)
		updated[event.target.id] = event.target.value
		this.setState({
			task: updated
		})
	}

	submitTask(event){
		event.preventDefault()
		console.log(JSON.stringify(this.state.task))
		this.props.onSubmitTask(this.state.task)
	}

	render(){
		return (
			<div>
				<h2>CreateTask</h2>
				<input onChange={this.updateTask.bind(this)} id="title" type="text" placeholder="Title" />
				<br />
				<input onChange={this.updateTask.bind(this)} id="description" type="text" placeholder="Description" />
				<br />
				<select id="category" onChange={this.updateTask.bind(this)}>
					<option value="delivery">Delivery</option>
					<option value="dog walking">Dog Walking</option>
					<option value="house cleaning">House Cleaning</option>
				</select>
				<br />
				<button onClick={this.submitTask.bind(this)}>Submit</button>
			</div>
		)
	}

}

export default CreateTask

