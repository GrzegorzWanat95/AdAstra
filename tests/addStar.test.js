const path = require('path');
const assert = require('chai').assert;
const request = require('supertest');
const server = require('../main.js');

describe('Adding a star', function() {
  let app;

  before(function() {
    app = server.listen(3000); // Start the server
  });

  after(function(done) {
    app.close(done); // Close the server after the tests are done
  });

  it('should add a star when the form is submitted', function(done) {
    const starData = {
      name: 'Kaus Australis',
      description: 'Opis gwiazdy Kaus Australis',
      image: path.join(__dirname, 'path/to/your/image.jpg') // Provide the path to your image file
    };

    request(app)
      .post('/add')
      .attach('image', starData.image)
      .field('name', starData.name)
      .field('description', starData.description)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
