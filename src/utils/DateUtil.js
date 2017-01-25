import React from 'react'
import Time from 'react-time' // https://github.com/andreypopp/react-time

export default {
	formattedDate: (date) => {
		//if date is within 24 hours, return relative time component
		// or add hours, minutes
			var day = 24 * 60 * 60 * 1000
			if (day < {date})
				return <Time value={date} format="MM:hh" relative />
			else
				return <Time value={date} format="MMM DD, YYYY" />
	}
}