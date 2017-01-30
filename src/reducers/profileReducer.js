import constants from '../../constants'

var initialState = {

}

export default (state = initialState, action) => {
	let updated = Object.assign({}, initialState)

	switch(action.type){
		case constants.PROFILE_RECEIVED:
			console.log('PROFILE_RECEIVED: '+JSON.stringify(action.payload))

			return updated

		default:
			return state
	}
}