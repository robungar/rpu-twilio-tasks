import React,  { Component } from 'react'
import { Task, Account } from '../containers'

export default (props) => {
	return (
		<div id="wrapper">
			<div id="main">
				<div className="inner">
					<header id="header">
						<a href="#" className="logo"><strong>Twilio Tasks</strong></a>
					</header>
					<Task {...props}/>	
				</div>
			</div>
			<div id="sidebar">
				<Account />
			</div>
		</div>
	)
}