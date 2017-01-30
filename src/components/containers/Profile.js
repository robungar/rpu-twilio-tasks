import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../actions'

class Profile extends Component {
	componentDidMount(){
	console.log('PROFILE: '+JSON.stringify(this.props.profile))
	console.log('MESSAGE: '+JSON.stringify(this.props.message))

	console.log('PARAMS: '+JSON.stringify(this.props.params))

	this.props.fetchProfile(id)

	}

	render(){
		return(
			<div>
				<h2>Profile Container</h2>
				<h3>{this.props.profile.username}</h3><br />
				<h3>{this.props.profile.email}</h3><br />
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		message: state.message,
		profile: state.account.user //always logged in person, not profile
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchProfile: (id) => dispatch(actions.fetchProfile(id))
	}
}


export default connect(stateToProps, dispatchToProps)(Profile)