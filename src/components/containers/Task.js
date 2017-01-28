import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { TextUtil, DateUtil } from '../../utils'

class Task extends Component {
	constructor(){
		super()
		this.state = {
			message: {
				text: '',
				profile: ''
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
		 		const params = {
		 			recipient: task.profile.id,
		 			text: updated.text,
		 			taskResponder: updated.profile.username
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

		const messageList = this.props.tasks[this.props.tasks.message]

		return(
			<section style={{paddingTop:24}}>
				<header className="major">
					<h2 style={{border: 'none', marginBottom:0}}>{task.title}</h2>
				</header>
				<div className="posts">
					<article style={{background: '#f9f9f9', border:'1px solid #ddd', padding:16}}>
						<strong>{TextUtil.capitalize(task.category)}</strong><br />
						<strong>{TextUtil.capitalize(task.profile.username)}</strong><br />
							{DateUtil.formattedDate(task.timestamp)}
						<hr />
						<p>{task.description}</p>
					</article>
				</div>

				<h3>Replies</h3>
				{ (messageList == null) ? null :
						messageList.map((task, i) => {
							const username = message.profile.username || 'anonymous'

							return (
								<div key={message.id} className="box">
									
									<strong style={localStyle.detailText}>{DateUtil.formattedDate(message.timestamp)}</strong>
									<span style={localStyle.pipe}>|</span>
									<Link to={'/profile/'+message.profile.id}>
									<span style={localStyle.detailText}>{username}</span>
									</Link>
									<Link to={'/task/'+message.id}>{message.text}</Link><br />
									
								</div>
							)
						})
					}
				{
					(this.props.account.user == null) ? <h3>Please Log in or Register to Reply</h3> : 
					<div>
						<h3>Reply</h3>
						<textarea onChange={this.updateMessage.bind(this)} placeholder="Enter a message to respond"></textarea><br />
						<button onClick={this.submitMessage.bind(this)}>Send Reply</button>
					</div>
				}
			</section>
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