import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Categories extends Component {
	selectCategory(category, event){
		event.preventDefault()
		this.props.selectCategory(category)
	}

	render(){
		return (
			<div className="inner">
				<nav id="menu">
					<header className="major">
						<h2>Categories</h2>
					</header>

					<ul>
						{this.props.tasks.categories.map((category, i) => {
							const color = (category == this.props.tasks.selectedCategory) ? 'red' : '#333'
							return (
								<li key={category}>
									<a onClick={this.selectCategory.bind(this, category)} href="#" style={{color: color}}>{category}</a>
								</li>
								)
							})
						}
					</ul>
				</nav>
				
				<footer id="footer">
					<p className="copyright">&copy; Rob Ungar. All rights reserved. Demo Images: <a href="https://unsplash.com">Unsplash</a>. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
				</footer>
			</div>
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
		selectCategory: (category) => dispatch(actions.selectCategory(category))
	}
}

export default connect(stateToProps, dispatchToProps)(Categories)