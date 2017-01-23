import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Task extends Component {
	constructor(){
		super()
		this.state = {
			message: {
				text: ''
			}
		}
	}

	
	componentDidMount(){
		 console.log('componentDidMount: '+JSON.stringify(this.props))
	}

	updateMessage(event){
		let updated = Object.assign({}, this.state.message)
		updated['text'] = event.target.value

		this.setState({
			message: updated
		})
	//	console.log('message'+JSON.stringify(this.state.message))
	}


	submitMessage(event){
		event.preventDefault()
		console.log('submitMessage: '+JSON.stringify(this.state.message))
		let updated = Object.assign({}, this.state.message)
		
		const user = this.props.account.user
		updated['profile'] = {
			id: user.id,
			username: user.username
		}

		updated['task'] = this.props.params.id

		const taskId = this.props.params.id
		const task = this.props.tasks[taskId]

		console.log('submitMessage: '+JSON.stringify(updated))
		 this.props.submitMessage(updated)
		 .then(response => {
		 		console.log('MESSAGE CREATED: '+JSON.stringify(response))
		 		//alert('Thanks for replying. Good luck!')
		 		// TO DO: send a notification to the task creator
		 		const params = {
		 			recipient: task.profile.id,
		 			text: updated.text
		 		}
		 		return this.props.notify(params)
		 })
		 .then(response => {
		 		alert('Thanks for replying. Good luck!')
		 })
		 .catch(err => {
		 		console.log('ERR: '+JSON.stringify(err))
		 })
	}

	render(){
		const taskId = this.props.params.id
		const task = this.props.tasks[taskId]
		return(
			<div id="wrapper">
				<div id="main">
					<div className="inner">
						<div className="header">
							<h2>{task.title}</h2><br />
							<h3>{task.description}</h3><br />
							<h3>{task.category}</h3><br />
							<h3>{task.profile.username}</h3><br />

							{
								(this.props.account.user == null) ? <h3>Please Log in or Register to Reply</h3> : 
								<div>
									<h3>Reply</h3>
									<textarea onChange={this.updateMessage.bind(this)} placeholder="Enter a message to respond"></textarea><br />
									<button onClick={this.submitMessage.bind(this)}>Send Reply</button>
								</div>
							}
						</div>
					</div>
				</div>
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

const dispatchToProps = (dispatch) => {
	return {
		submitMessage: (params) => dispatch(actions.submitMessage(params)),
		notify: (params) => dispatch(actions.notify(params))
	}
}

export default connect(stateToProps, dispatchToProps)(Task)