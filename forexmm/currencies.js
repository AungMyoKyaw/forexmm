//get currencies
'use strict';
const http = require('http');

function getcurrencies(cb){
	let options = {
		hostname:'forex.cbm.gov.mm',
		port:80,
		path:'/api/currencies',
		agent:false
	}
	http.get(options,(res)=>{
		let currencies = '';
		res.setEncoding('utf8');
		res.on('data',(data)=>{
			currencies += data;
		});
		res.on('end',()=>{
			let parsed;
			try {
				parsed = JSON.parse(currencies);
			} catch(err) {
				return cb(err);
			}
			cb(null,parsed);
		});
	})
	.on('err',(err)=>{
		cb(err);
	});
}

module.exports = getcurrencies;
