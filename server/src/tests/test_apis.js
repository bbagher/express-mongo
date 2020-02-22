const { expect } = require('chai');
const request = require('request');

describe('Apis', () => {
  describe('fetches data from database', () => {
    it('page status is 200', (done) => {
      request('http://localhost:4444', (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
    it('renders page content', (done) => {
      request('http://localhost:4444/api/news', (err, res, body) => {
        expect(JSON.parse(body)[0].title).to.equal('Helo');
        done();
      });
    });
  });
});
