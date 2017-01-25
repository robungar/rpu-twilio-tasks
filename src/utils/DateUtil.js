import React from 'react'
import Time from 'react-time' // https://github.com/andreypopp/react-time

export default {
	formattedDate: (date) => {
		//if date is within 24 hours, return relative time component
		// or add hours, minutes
		if({date} < (24 * 60 * 60 * 1000))
			return <Time value={date} format="HH" relative />
		else
			return <Time value={date} format="MMM DD, YYYY" />
	}
}