# FOREXMM [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/AungMyoKyaw/forexmm/issues)[![NSP Status](https://nodesecurity.io/orgs/aung-myo-kyaw/projects/33eab043-23a0-4fff-a650-57066c299938/badge)](https://nodesecurity.io/orgs/aung-myo-kyaw/projects/33eab043-23a0-4fff-a650-57066c299938)

[![NPM](https://nodei.co/npm/forexmm.png?downloads=true)](https://nodei.co/npm/forexmm/)

[http://forex.cbm.gov.mm/index.php/api](http://forex.cbm.gov.mm/index.php/api) does not allow CORS.
This npm package help you to bypass CORS issue and to build Myanmar Exchange Rate API server.

## Installation
```
npm install --save forexmm
```

## API List
- latest
- currencies
- history

### latest
```
var forexmm = require('forexmm');
var latest = forexmm.latest;
latest((err,data)=>{
	if(err){
		console.log(err);
	} else {
		console.log(data);
	}
});
```

### currencies
```
var forexmm = require('forexmm');
var currencies = forexmm.currencies;
currencies((err,data)=>{
	if(err){
		console.log(err);
	} else {
		console.log(data);
	}
});
```

### history
```
var forexmm = require('forexmm');
var history = forexmm.history;
var date = 6-2-2017; //dd-mm-yyyy
history(date,(err,data)=>{
	if(err){
		console.log(err);
	} else {
		console.log(data);
	}
});
```

#### Sample API Server Using Express.js
```
const express = require('express');
const app = express();

const forexmm = require('forexmm');
const latest = forexmm.latest;
const currencies = forexmm.currencies;
const history = forexmm.history;

app.get('/latest',(req,res)=>{
	latest((err,data)=>{
		if(err){
			res.sendStatus(500);
		} else {
			res.json(data);
		}
	});
});

app.get('/currencies',(req,res)=>{
	currencies((err,data)=>{
		if(err){
			res.sendStatus(500);
		} else {
			res.json(data);
		}
	});
});

app.get('/history/:date',(req,res)=>{
	let date = req.params.date;
	history(date,(err,data)=>{
		if(err){
			console.log(err);
			res.sendStatus(500);
		} else {
			res.json(data);
		}
	});
});

app.all("*",(req,res)=>{
	res.sendStatus(404);
});

app.listen(80,()=>{
	console.log(':)');
});
```
