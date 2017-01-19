import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Task extends Component {
	
	componentDidMount(){
		// console.log('componentDidMount: '+JSON.stringify(this.props.params.id))

		// Grab the task from the store:
		// const taskId = this.props.params.id
		// const task = this.props.tasks[taskId]
		// console.log('componentDidMount: '+JSON.stringify(task))
	}

	render(){
		const taskId = this.props.params.id
		const task = this.props.tasks[taskId]
		return(
			<div>
				{task.category}<br />
				<h1>{task.title}</h1><br />
				{task.description}<br />
				{task.profile.username}
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		tasks: state.task
	}
}

export default connect(stateToProps)(Task)