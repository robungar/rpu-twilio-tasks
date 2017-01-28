import constants from '../constants'

var initialState = {
	profile: null
}

export default (state = initialState, action) => {
	let updated = Object.assign({}, state)

	switch (action.type){
		case constants.PROFILE_RECEIVED:
			console.log('PROFILE_RECEIVED: '+JSON.stringify(action.profile))
			updated['profile'] = action.payload
			return updated

		default:
			return state
	}
}