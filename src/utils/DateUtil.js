import React from 'react'
import Time from 'react-time' // https://github.com/andreypopp/react-time

export default {
	formattedDate: (date) => {
		const now = new Date().getTime()
		//console.log('NOW: '+now)

		const diff = now - new Date(date).getTime()
		//console.log('DIFF: '+diff)

		const seconds = diff / 1000
		const mins = seconds / 60
		const hours = mins / 60

		if (hours < 24)
			return <Time value={date} format="MMM DD, YYYY" relative />
		//if date is within 24 hours, return relative time component
		// or add hours, minutes

		return <Time value={date} format="MMM DD, YYYY" />
	}
}