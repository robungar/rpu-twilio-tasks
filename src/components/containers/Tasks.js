import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { Authenticate } from '../view'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Link } from 'react-router'
import Task from '../containers'
import { DateUtil } from '../../utils'

class Tasks extends Component {
	getTasks(){
//		console.log('getTasks: '+this.props.tasks.selectedCategory)
		if (this.props.tasks[this.props.tasks.selectedCategory] != null)
			return

		this.props.fetchTasks({category: this.props.tasks.selectedCategory})
		.then(results => {

		})
		.catch(err => {
			alert(err)
		})
	}

	componentDidMount(){
		this.getTasks()
	}

	componentDidUpdate(){
		this.getTasks()
	}

	createTask(task){
		this.props.submitTask(task)
		.then(result => {
//			console.log(JSON.stringify(result))
		})
		.catch(err => {
			console.log('ERROR: '+JSON.stringify(err))
		})
	}

	render(){
		const taskList = this.props.tasks[this.props.tasks.selectedCategory]

		return (
			<section id="banner">
				<div className="content">
				<h3>Current Tasks</h3>
				{ (taskList == null) ? null :
						taskList.map((task, i) => {
							const username = task.profile.username || 'anonymous'

							return (
								<div key={task.id} className="box">
									<Link to={'/task/'+task.id}><h3>{task.title}</h3></Link>
									<strong style={localStyle.detailText}>{DateUtil.formattedDate(task.timestamp)}</strong>
									<span style={localStyle.pipe}>|</span>
									<Link to={'/profile/'+task.profile.id}>
									<span style={localStyle.detailText}>{username}</span>
									</Link>
									<Link to={'/task/'+task.id}>{task.description}</Link><br />
									
								</div>
							)
						})
					}
				</div>
			</section>
		)
	}
}

const localStyle = {
	detailText: {
		float: 'right'
	},
	pipe: {
		float: 'right',
		marginRight: 12,
		marginLeft: 12
	}
}

const stateToProps = (state) => {
	return {
		tasks: state.task
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchTasks: (params) => dispatch(actions.fetchTasks(params)),
		tasksReceived: (tasks) => dispatch(actions.tasksReceived(tasks)),
		submitTask: (params) => dispatch(actions.submitTask(params))
//		taskCreated: (task) => dispatch(actions.taskCreated(task))
	}
}

export default connect(stateToProps, dispatchToProps)(Tasks)

