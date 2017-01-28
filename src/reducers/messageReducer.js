import constants from '../constants'

var initialState = {
	
}

export default (state = initialState, action) => {
	let updated = Object.assign({}, state)

	switch (action.type) {
		case constants.MESSAGES_RECEIVED:
			console.log('MESSAGES_RECEIVED: '+JSON.stringify(action.payload))

			let taskId = action.params.task
			updated[taskId] = action.payload
			console.log('updated:'+JSON.stringify(updated))

			return updated
		
		default:
			return state
	}
}