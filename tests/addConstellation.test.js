const assert = require('assert');
const request = require('supertest');
const app = require('../main.js'); 

describe('Formularz dodawania konstelacji', function() {
  it('powinien dodawać nową konstelację', function(done) {
    const imagePath = '../AdAstra/uploads/moon6.png';

    request(app) 
      .post('/addConstellation')
      .field('name', 'Konstelacja A')
      .field('description', 'To jest opis Konstelacji A')
      .field('stars[]', ['6468a9d4cb108912c6eb9a6b', '6468aad43355a0df0352c0d7']) // Przykładowe ID gwiazd
      .attach('image', imagePath) 
      .expect(302)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('powinien zwracać błąd, jeśli nie podano wymaganego pola', function(done) {
    const imagePath = '../AdAstra/uploads/moon6.png';

    request(app) 
      .post('/addConstellation')
      .field('name', 'Konstelacja B')
      .field('description', "") 
      .field('stars[]',['6468a9d4cb108912c6eb9a6b', '6468aad43355a0df0352c0d7']) // Przykładowe ID gwiazd
      .attach('image', imagePath) 
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});