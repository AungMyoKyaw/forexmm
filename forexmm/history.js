//get exchange rate history
'use strict';
const http = require('http');

function getHistory(date,cb){
	let options = {
		hostname:'forex.cbm.gov.mm',
		port:80,
		path:`/api/history/${date}`,
		agent:false
	}
	http.get(options,(res)=>{
		let exchangeRate = '';
		res.setEncoding('utf8');
		res.on('data',(data)=>{
			exchangeRate += data;
		});
		res.on('end',()=>{
			let parsed;
			try {
				parsed = JSON.parse(exchangeRate);
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

module.exports = getHistory;
