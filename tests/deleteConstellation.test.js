const assert = require('assert');
const request = require('supertest');
const app = require('../main.js');

describe('Usuwanie konstelacji', function() {
  it('powinno usunąć konstelację i zwrócić kod 302', function(done) {
    const constellationId = '6473012c9051e272b009a4f6';

    request(app)
      .get(`/deleteConstellation/${constellationId}`)
      .expect(302)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('powinno zwrócić kod 404, jeśli konstelacja nie istnieje', function(done) {
    const nonExistentConstellationId = '6473012c9051e272b009a4f6';

    request(app)
      .delete(`/deleteConstellation/${nonExistentConstellationId}`)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});