import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Profile extends Component {
	componentDidMount(){
	// console.log('PROFILE: '+JSON.stringify(this.props.profile))
	// console.log('MESSAGE: '+JSON.stringify(this.props.message))

	// console.log('PARAMS: '+JSON.stringify(this.props.params))

	const id = this.props.params.id
	if (this.props.profiles[id] != null)
		return

	this.props.fetchProfile(id)
	

	}

	render(){
		const profile = this.props.profiles[this.props.params.id]
		
		return (profile == null) ? <div>Not found</div> : (
			<div>
				<h2>Profile Container</h2>
				<h3>{profile.username}</h3><br />
				<h3>{profile.email}</h3><br />
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		
		profiles: state.profile
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchProfile: (id) => dispatch(actions.fetchProfile(id))
	}
}


export default connect(stateToProps, dispatchToProps)(Profile)