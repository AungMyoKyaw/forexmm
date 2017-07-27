var chai = require('chai');
var should = chai.should();

var forexmm = require('../dist/index');

describe('forexmm test',function(){
	it('latest test',function(done){
		var latest = forexmm.latest;
		latest.then(data=>{
			data.should.include.all.keys('info','description','timestamp','rates');
			done();
		})
		.catch(err=>{
			process.exit(1);
		})
	})

	it('currencies test',function(done){
		var currencies = forexmm.currencies;
		currencies.then(data=>{
			data.should.include.all.keys('info','description','currencies');
			done();
		})
		.catch(err=>{
			process.exit(1);
		})
	})

	it('history test',function(done){
		var history = forexmm.history;
		var date = '6-2-2017'; //dd-mm-yyyy
		history(date).then(data=>{
			data.should.include.all.keys('info','description','timestamp','rates');
			done();
		})
		.catch(err=>{
			process.exit(1);
		});
	})
})
