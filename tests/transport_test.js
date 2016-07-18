var superagent = require('superagent')
var expect = require('chai').expect

describe('Transport rest api', function(){
  var id

  it('creates a transport', function(done){
    superagent.post('http://localhost:3000/transports')
      .send({
        title: "Zeppelin ride in Germany",
        departure_date: new Date(2016, 08, 01),
        arrival_date: new Date(2016, 08, 16),
        departure_point: {
          lat: 1.23,
          lng: -1.23
        },
        arrival_point: {
          lat: -4.56,
          lng: 4.56
        },
        status: 'PROPOSED'
      })
      .end(function(e,res){
        // console.log(res.body)
        expect(e).to.equal(null)
        expect(res.body.length).to.equal(1)
        expect(res.body[0]._id.length).to.equal(24)
        id = res.body[0]._id
        done()
      })
  })

  it('retrieves a transport', function(done){
    superagent.get('http://localhost:3000/transports/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.equal(null)
        expect(typeof res.body).to.be.a('object')
        expect(res.body._id.length).to.equal(24)
        expect(res.body._id).to.equal(id)
        done()
      })
  })

  it('retrieves a collection of transports', function(done){
    superagent.get('http://localhost:3000/transports')
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.equal(null)
        expect(res.body.length).to.be.above(0)
        expect(res.body.map(function (item){return item._id})).to.contain(id)
        done()
      })
  })

  it('updates a transport', function(done){
    superagent.put('http://localhost:3000/transports/'+id)
      .send({
        status: 'CONFIRMED'
      })
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.equal(null)
        expect(typeof res.body).to.equal('object')
        expect(res.body.msg).to.equal('success')
        done()
      })
  })

  it('checks an updated transport', function(done){
    superagent.get('http://localhost:3000/transports/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.equal(null)
        expect(typeof res.body).to.equal('object')
        expect(res.body._id.length).to.equal(24)
        expect(res.body._id).to.equal(id)
        expect(res.body.status).to.equal('CONFIRMED')
        done()
      })
  })
  
  it('removes a transport', function(done){
    superagent.del('http://localhost:3000/transports/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.equal(null)
        expect(typeof res.body).to.equal('object')
        expect(res.body.msg).to.equal('success')
        done()
      })
  })
})
