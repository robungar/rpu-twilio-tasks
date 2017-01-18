import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Authenticate } from '../view'


class Account extends Component {

	componentDidMount(){
		if (this.props.user == null) // check current user
			this.props.checkCurrentUser()
	}

	login(credentials){
		console.log('login: '+JSON.stringify(credentials))
		this.props.login(credentials)
		.then(response => {

		})
		.catch(err => {
			alert(err.message)
		})
	}

	register(credentials){
		console.log('register: '+JSON.stringify(credentials))
		this.props.register(credentials)
	}

	render(){
		return (
			<div>
				<h2>Account</h2>
				{ (this.props.user == null) ? <Authenticate onLogin={this.login.bind(this)} onRegister={this.register.bind(this)} /> :
					<h2> Hello {this.props.user.username}</h2>
				}

			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		user: state.account.user // can be null
	}
}

const dispatchToProps = (disptach) => {
	return {
		register: (credentials) => disptach(actions.register(credentials)),
		login: (credentials) => disptach(actions.login(credentials)),
		checkCurrentUser: () => disptach(actions.checkCurrentUser())
	}
}

export default connect(stateToProps, dispatchToProps)(Account)



