const assert = require('assert');
const request = require('supertest');
const app = require('../main.js');

describe('Usuwanie gwiazdy', function() {
  it('powinno usunąć gwiazdę i zwrócić kod 302', function(done) {
    const starId = '64730110d8c0dd7d3858e194';

    request(app)
      .get(`/delete/${starId}`)
      .expect(302)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('powinno zwrócić kod 404, jeśli gwiazda nie istnieje', function(done) {
    const nonExistentStarId = '64730110d8c0dd7d3858e194';

    request(app)
      .delete(`/delete/${nonExistentStarId}`)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
