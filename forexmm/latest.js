//get latest exchange reate
'use strict';
const http = require('http');

function getLatest(cb){
	let options = {
		hostname:'forex.cbm.gov.mm',
		port:80,
		path:'/api/latest',
		agent:false
	}
	http.get(options,(res)=>{
		let latestExchangeRate = '';
	  res.setEncoding('utf8');
		res.on('data',(data)=>{
			latestExchangeRate += data;
		});
		res.on('end',()=>{
			let parsed;
			try {
				parsed = JSON.parse(latestExchangeRate);
			} catch(err) {
				return cb(err);
			}
			cb(null,parsed);
		});
	})
	.on('error',(err)=>{
		cb(err);
	});
}

module.exports = getLatest;
