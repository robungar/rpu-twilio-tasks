import constants from '../constants'
import { APIManager } from '../utils'

const getRequest = (path, params, actionType) => {
	console.log('Hi')
	return (dispatch) => 
		APIManager.get(path, params)
		.then(response => {

			const payload = response.results || response.result || response.user

			dispatch({
				type: actionType,
				payload: payload,
				params: params
			})

			return response
		})
		.catch(err => {

			throw err
		})
}

const postRequest = (path, params, actionType) => {
	return (dispatch) => 
		APIManager.post(path, params)
		.then(response => {
//			console.log('POST: '+JSON.stringify(response))
			const payload = response.results || response.result || response.user

			dispatch({
				type: actionType,
				payload: payload,
				params: params
			})
			return response
		})
		.catch(err => {
//			console.log('ERR: '+JSON.stringify(err.message))
			throw err
		})
}

export default {

	register: (credentials) => {
		return (dispatch) => {
			return dispatch(postRequest('/account/register', credentials, constants.PROFILE_CREATED))
		}
	},

	login: (credentials) => {
		return (dispatch) => {
			return dispatch(postRequest('/account/login', credentials, constants.USER_LOGGED_IN))
		}
	},

	checkCurrentUser: () => {
		return (dispatch) => {
			return dispatch(getRequest('/account/currentuser', {}, constants.USER_LOGGED_IN))
		}
	},

	fetchProfile: (id) => {
		return (dispatch) => {
			return dispatch(getRequest('/api/profile/'+id, null, constants.PROFILE_RECEIVED))
		}
	},

	fetchTasks: (params) => {
		return (dispatch) => {
			return dispatch(getRequest('/api/task', params, constants.TASKS_RECEIVED))
		}
	},

	tasksReceived: (tasks) => {
		return {
			type: constants.TASKS_RECEIVED,
			payload: tasks
		}
	},

	submitTask: (params) => {
		return (dispatch) => {
			return dispatch(postRequest('/api/task', params, constants.TASK_CREATED))
		}
	},

	submitMessage: (params) => {
		return (dispatch) => {
			return dispatch(postRequest('/api/message', params, constants.MESSAGE_CREATED))
		}
	},

	fetchMessages: (params) => {
		return (dispatch) => {
			return dispatch(getRequest('/api/message', params, constants.MESSAGES_RECEIVED))
		}
	},

	selectCategory: (category) => {
		return {
			type: constants.CATEGORY_SELECTED,
			payload: category
		}
	},

	notify: (params) => {
		return(dispatch) => {
			return dispatch(postRequest('/twilio/notify', params, null))
		}
	}

	// taskCreated: (task) => {
	// 	return {
	// 		type: constants.TASK_CREATED,
	// 		payload: task
	// 	}
	// }

}