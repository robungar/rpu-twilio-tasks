import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Home } from './components/layout'
import { Task } from './components/containers'
import { Provider } from 'react-redux'
import store from './stores'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// const app = (
// 	<Provider store={ store.configureStore() }>
// 		<div>
// 			React Entry Point
// 			<Home />
// 		</div>
// 	</Provider>
// )

const app = (
	<Provider store={ store.configureStore() }>
		<Router history={browserHistory}>
			<Route path="/" component={Home} />
			<Route path="/task/:id" component={Task} />
		</Router>
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'))