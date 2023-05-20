const assert = require('assert');
const request = require('supertest');
const app = require('../main.js');

describe('Usuwanie konstelacji', function() {
  it('powinno usunąć konstelację i zwrócić kod 302', function(done) {
    const constellationId = '6468bfb411d4afc3f735ea2c';

    request(app)
      .get(`/deleteConstellation/${constellationId}`)
      .expect(302)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('powinno zwrócić kod 404, jeśli konstelacja nie istnieje', function(done) {
    const nonExistentConstellationId = '6468aad43355a0df0352c0d71';

    request(app)
      .delete(`/deleteConstellation/${nonExistentConstellationId}`)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});