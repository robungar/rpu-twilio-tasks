import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../actions'

class Profile extends Component {
	componentDidMount(){
		console.log('ID: '+JSON.stringify(this.props.profile))
		//this.props.profileReceived(response.results)
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
		profile: state.account.user
	}
}



export default connect(stateToProps, dispatchToProps)(Profile)