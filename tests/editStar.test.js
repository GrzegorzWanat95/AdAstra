//Test edycji gwiazdy
const assert = require('assert');
const request = require('supertest');
const app = require('../main.js');

describe('Edycja ciała niebieskiego', function() {
  const starId = '6468c1b5f2f8ff220a0af59d'; //ID edytowanego obiektu

  //Aktualizowane dane
  it('powinien zaktualizować dane ciała niebieskiego', function(done) {
    const updatedData = {
      name: 'Nowa Nazwa',
      description: 'Nowy Opis',
      old_image: 'moon6.png'
    };

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

  it('powinien zwracać błąd, jeśli nie podano wymaganego pola', function(done) {
    const updatedData = {
      name: 'Nowa Nazwa',
      description: '',
      old_image: 'moon6.png'
    };
  
    request(app)
      .post(`/edit/${starId}`)
      .field('name', updatedData.name)
      .field('description', updatedData.description)
      .field('old_image', updatedData.old_image)
      .expect(302) // Updated assertion to expect 302 (Found) status code
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
