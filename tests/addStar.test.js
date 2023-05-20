const assert = require('assert');
const request = require('supertest');
const app = require('../main.js'); 

describe('Formularz dodawania ciała niebieskiego', function() {
  it('powinien dodawać nowe ciało niebieskie', function(done) {
    const imagePath = '../AdAstra/uploads/moon6.png';

    request(app) 
      .post('/add')
      .field('name', 'Planeta X')
      .field('description', 'To jest opis Planety X')
      .attach('image', imagePath) 
      .expect(302)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should add a star when the form is submitted', function(done) {
    const starData = {
      name: 'Kaus Australis',
      description: 'Opis gwiazdy Kaus Australis',
      image: path.join(__dirname, 'path/to/your/image.jpg') // Provide the path to your image file
    };

    request(app) 
      .post('/add')
      .field('name', 'Planeta Y')
      .field('description', "") 
      .attach('image', imagePath) 
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
