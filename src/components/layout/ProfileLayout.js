import React, { Component } from 'react'
import { Profile } from '../containers'

class ProfileLayout extends Component {
	render(){
		return(
			<div>
				<Profile {...this.props} />
			</div>
		)
	}
}

export default ProfileLayout