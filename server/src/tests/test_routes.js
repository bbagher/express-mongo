const { expect } = require('chai');
const request = require('request');

describe('Routes', () => {
  describe('Main page', () => {
    it('renders page content', (done) => {
      request('http://localhost:4444', (err, res, body) => {
        expect(body).to.equal('{"message":"Hello world!"}');
        done();
      });
    });

    it('page status is 200', (done) => {
      request('http://localhost:4444', (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('notFound status is 404', (done) => {
      request('http://localhost:4444/notaroute', (err, res, body) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
    });
  });
});
