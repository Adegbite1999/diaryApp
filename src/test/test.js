const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
// const expect = chai.expect();
const should = chai.should();
var token;

chai.use(chaiHttp);
// var log = console.log()
describe("First Test", function () {
    it("it should return a token", function (done) {
        chai.request(app)
            .post('/api/v1/auth/signin').send({
                email: 'adegbite@gmail.com',
                password: 'Update#0499'
            })
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('data').have.property('token')
                token = res.body.data.token;
                done();
            })
    });
    it('create a new diary entry', function (done) {
        let payload = { title: 'Hello', description: 'This is my first entry.' }
        chai.request(app)
            .post('/api/v1/entries')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
            .end(function (err, res) {
                expect(res).to.have.status(201)
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('data')
                done()
            })
    });
    it('GET all diary entry', function (done) {
        chai.request(app)
            .get('/api/v1/entries')
            .set('Authorization', `Bearer ${token}`)
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('data')
                done();
            })
    });

})