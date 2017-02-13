//get latest exchange reate
'use strict';
const http = require('http');

const getLatest = new Promise((resolve,reject)=>{
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
				reject(err);
			}
			resolve(parsed);
		});
	})
	.on('error',(err)=>{
		reject(err);
	});
});

module.exports = getLatest;
