var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
//var twilio = require('twilio')
var utils = require('../utils')


router.get('/notify', function(req, res, next) {
	utils.TwilioHelper
	.sendSMS('5166064964', 'Does this thing work 4?')
	.then(function(message){
		res.json({
			confirmation: 'success',
			message: message
		})
		return message
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})


router.post('/notify', function(req, res, next) {
	console.log(JSON.stringify(req.body))
	if(req.body.recipient == null){
		res.json({
			confirmation: 'fail',
			message: 'Please specify a recipient.'
		})
		return
	}

	if(req.body.text == null){
		res.json({
			confirmation: 'fail',
			message: 'Please include a message.'
		})
		return
	}

	controllers.profile
	.getById(req.body.recipient, false) // Get profile first
	.then(function(profile){
		var msg = req.body.taskResponder + ' replied to your task. Here is the message:\n\n'+req.body.text+'. View '+req.body.taskResponder+'\'s profile here: https://rpu-twilio-tasks.herokuapp.com/profile/api'+req.body.taskResponder.profile+''
		
		return utils.TwilioHelper.sendSMS(profile.phone, msg)
	})
	.then(function(message){
		res.json({
			confirmation: 'success',
			message: message
		})
		return message
	})	
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})

router.get('/task', function(req, res, next) {
    res.json({
    	confirmation: 'success',
    	message: 'It worked!'
    })
})

router.post('/task', function(req, res, next) {
//    res.render('index', { title: 'Express' })

	console.log('TWILIO: '+JSON.stringify(req.body))
	// TWILIO: {"ToCountry":"US","ToState":"NY","SmsMessageSid":"SM0a1de785280d9cce83cd5585741354b7","NumMedia":"0","ToCity":"NEW YORK","FromZip":"10128","SmsSid":"SM0a1de785280d9cce83cd5585741354b7","FromState":"CT","SmsStatus":"received","FromCity":"NORWALK","Body":"Test task","FromCountry":"US","To":"+16467130087","ToZip":"10028","NumSegments":"1","MessageSid":"SM0a1de785280d9cce83cd5585741354b7","AccountSid":"AC817c36f0cdb7e4d489c5e2586a149095","From":"+12037227160","ApiVersion":"2010-04-01"}

	var message = req.body['Body']	
	// Title. Category. task description.
	// example: 'Package pickup. Delivery. Please pick up my package from the post office.'

	var validCategories = ['delivery', 'dog walking', 'house cleaning', 'misc']

	var parts = message.split('.') // hopefully 3 parts
	var category = (parts.length == 1) ? 'misc' : parts[1].trim().toLowerCase()
	var description = null

	if(validCategories.indexOf(category) == -1){
		category = 'misc'
		var theRest = parts.slice(1)
		description = theRest.trim()
	} else {
		description = (parts.length < 3) ? '' : parts[2].trim()
	}

	var task = {
		title: parts[0],
		category: category,
		description: description
	}

	var from = req.body['From'].replace('+1', '') // phone # of sender

	controllers.profile.get({phone: from}, false)
	.then(function(profiles){
		if (profiles.length == 0){
			throw new Error('Go away.')
			return
		}

		var profile = profiles[0]
		task['profile'] = {
			id: profile.id,
			username: profile.username
		}

		return controllers.task.post(task, false)
	})
	.then(function(result){
	//	console.log('SUCCESS: '+JSON.stringify(result))
		var msg = 'Thanks, we got your task.'

		return utils.TwilioHelper.sendSMS(from, msg)
	  
	})
	.catch(function(err){
		console.log('ERROR: '+err.message)
	})
})

module.exports = router
