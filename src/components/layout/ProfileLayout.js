import React, { Component } from 'react'
import { Profile } from '../containers'

class ProfileLayout extends Component {
	render(){
		return(
			<div id="wrapper">
				<div id="main">
					<div className="inner">
						<header id="header">
							<a href="#" className="logo"><strong>Twilio Tasks</strong></a>
						</header>	
					</div>
					<Profile {...this.props} />
				</div>
			</div>
		)
	}
}

export default ProfileLayout