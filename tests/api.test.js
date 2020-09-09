const request = require('supertest') /* Por lo general se llama request porque supertest va a hacer por nosotros las peticiones */

const app = require('../src/app')


/*
 * Testing get all user endpoints
*/

/*
Con las funciones describe y it básicamente logramos que por consola nos diga: Estas testeando esta funcionalidad
*/

it('it should respond with json containing a list of all users', done => {
    request(app)
        .get('/users')
        .set('Accept', 'application/json')/* Esto es así porque en las Rest API se envían y reciben archivos json */
        .expect('Content-Type', /json/)
        .expect(200, done);
})


describe('/GET /users/:id', () => {
    it("respond with json containing a single user", (done) => {
        request(app)
            .get('/users/User0001')
            .set('Accept', 'application/json')/* Esto es así porque en las Rest API se envían y reciben archivos json */
            .expect('Content-Type', /json/)
            .expect(200, done);

    });

    it('respond with json "user User0001  found"', (done) => {
        request(app)
            .get('/users/User0001')
            .set('Accept', 'application/json')/* Esto es así porque en las Rest API se envían y reciben archivos json */
            .expect('Content-Type', /json/)
            .expect(200)
            .expect('"User User0001 found"') /* Debe coincidir exactamente con el texto */
            .end((err) => {
                if(err) 
                    return done(err);
                else   
                    done();
            })

    });

    it('respond with json "user not found"', (done) => {
        request(app)
            .get('/users/User004234321')
            .set('Accept', 'application/json')/* Esto es así porque en las Rest API se envían y reciben archivos json */
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"User not found"') /* Debe coincidir exactamente con el texto */
            .end((err) => {
                if(err) 
                    return done(err);
                else   
                    done();
            })

    });

});


describe("POST /users", () => {
    it('respond with 201 created', done => {
        const data = {
            username: 'ovejadelmerval',
            password: '123456'
        }
        request(app)
            .post('/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(err => {
                if (err)
                    return done(err);
                else
                    done();
            })
    })

    it('respond with code 400 on bad request', done => {
        const data = {
        }
        request(app)
            .post('/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"user not created"')
            .end(err => {
                if (err)
                    return done(err);
                else
                    done();
            })
    })

})