//Test dodawania konstelacji 
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
      .field('stars[]', ['6472f6295774b14bfd1340d8', '6472f79f5774b14bfd1340dd']) // Przykładowe ID gwiazd
      .attach('image', imagePath) 
      .expect(302)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('powinien zwracać błąd, jeśli nie podano wymaganego pola', function(done) {
    const updatedData = {
      name: 'Nowa Nazwa',
      description: '',
      old_image: 'moon6.png'
    };

    const starId = '6472f79f5774b14bfd1340dd'; 

    request(app)
      .post(`/edit/${starId}`)
      .field('name', updatedData.name)
      .field('description', updatedData.description)
      .field('old_image', updatedData.old_image)
      .expect(302) 
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
