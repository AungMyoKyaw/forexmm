//get currencies
'use strict';
const http = require('http');

const getcurrencies = new Promise((resolve,reject)=>{
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
				reject(err);
			}
			resolve(parsed)
		});
	})
	.on('err',(err)=>{
		reject(err);
	});
});

module.exports = getcurrencies;
