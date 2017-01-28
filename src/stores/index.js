import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { taskReducer, accountReducer, messageReducer } from '../reducers'

var store;

export default {
	configureStore: () => {
		const reducers = combineReducers({
			task: taskReducer,
			account: accountReducer,
			message: messageReducer
		})

		store = createStore(
			reducers,
			applyMiddleware(thunk)
		)

		return store
	},

	currentStore: () => {
		return store
	}
}