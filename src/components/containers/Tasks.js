import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { CreateTask } from '../view'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Link } from 'react-router'
import Task from '../containers'

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
							return (
								<div key={task.id} className="box">
									<Link to={'/task/'+task.id}><h3>{task.title}</h3></Link>
									<Link to={'/task/'+task.id}>{task.description}</Link>
								</div>
							)
						})
					}
				</div>
				<CreateTask onSubmitTask={this.createTask.bind(this)} />
			</section>
		)
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

