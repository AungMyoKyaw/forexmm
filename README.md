[![Stories in Ready](https://badge.waffle.io/AungMyoKyaw/forexmm.png?label=ready&title=Ready)](https://waffle.io/AungMyoKyaw/forexmm)
# FOREXMM [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/AungMyoKyaw/forexmm/issues)[![NSP Status](https://nodesecurity.io/orgs/aung-myo-kyaw/projects/33eab043-23a0-4fff-a650-57066c299938/badge)](https://nodesecurity.io/orgs/aung-myo-kyaw/projects/33eab043-23a0-4fff-a650-57066c299938)

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
latest.then(data=>{
	console.log(data);
})
.catch(err=>{
	console.log(err);
})
```

### currencies
```
var forexmm = require('forexmm');
var currencies = forexmm.currencies;
currencies.then(data=>{
	console.log(data);
})
.catch(err=>{
	console.log(err);
})
```

### history
```
var forexmm = require('forexmm');
var history = forexmm.history;
var date = 6-2-2017; //dd-mm-yyyy
history(date).then(data=>{
	console.log(data);
})
.catch(err=>{
	console.log(err);
});
```

#### Sample API Server Using Express.js
```
const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

const forexmm = require('forexmm');
const latest = forexmm.latest;
const currencies = forexmm.currencies;
const history = forexmm.history;

app.get('/latest',(req,res)=>{
	latest.then(data=>{
		res.json(data);
	})
	.catch(err=>{
		res.status(500).json({err:err.message});
	})
});

app.get('/currencies',(req,res)=>{
	currencies.then(data=>{
		res.json(data);
	})
	.catch(err=>{
		res.status(500).json({err:err.message});
	})
});

app.get('/history/:date',(req,res)=>{
	let date = req.params.date;
	history(date).then(data=>{
		res.json(data);
	})
	.catch(err=>{
		res.status(500).send({err:err.message});
	});
});

app.all("*",(req,res)=>{
	res.sendStatus(404);
});

app.listen(PORT,()=>{
	console.log(`forexmm api server is running on port ${PORT}`);
});
```
