## Description 

A user sends a text to a specially-reserved phone number. The text is some sort of task that they would like someone to do for them - i.e. dog walking, house cleaning, etc. After the user submits their task, they receive a confirmation text in response from the application that thanks them for submitting their task. The task is posted to the app in the category specified by the user when they submitted the task.

The app lists all submitted tasks, sorted by category, in reverse chronological order. If another user would like to complete a posted task, they must register, or sign into the app, if they have not done so already. They can then submit a response via a form that will send their reply as a text to the user who created the task. The reply will also be posted, in reverse chronological order, beneath the post listing with a link to the profile of each responder.

The creator will receive a text that shows the responder’s message and a link to their profile. The two users can then correspond and make arrangements for the task to be completed.

## Steps to Run

1. If you do not have NPM installed on your machine, you must [install it first](https://docs.npmjs.com/cli/install)

2. Download the repository and change into it.

3. Run `npm install` in your terminal to download the Node modules.

4. Send a text to the service number: (516) 210-2241
	* Your text needs to take the following format. Title. Category. Description. Those periods must be entered so that the app can parse out what you are submitting. For example, a text might read: Walk my dog. Dog walking. Please walk my French Bulldog, Carl.

## Technologies Used 

Node.js, Express, Mongo, Mongoose, React, React Router, Redux, Superagent, Babel, Bluebird, Bcryptjs, Gulp, JsonWebToken, Webpack, 

## Services Used 

Twilio, Heroku, GitHub