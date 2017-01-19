import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Task extends Component {
	
	componentDidMount(){
		 console.log('componentDidMount: '+JSON.stringify(this.props))
	}

	render(){
		const taskId = this.props.params.id
		const task = this.props.tasks[taskId]
		return(
			<div>
				{task.category}<br />
				<h1>{task.title}</h1><br />
				{task.description}<br />
				{task.profile.username}<br />

				{
					(this.props.account.user == null) ? <h3>Please Log in or Register to Reply</h3> : 
					<div>
						<h3>Reply</h3>
						<textarea placeholder="Enter a message to respond"></textarea><br />
						<button>Send Reply</button>
					</div>
				}
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		tasks: state.task,
		account: state.account
	}
}

export default connect(stateToProps)(Task)