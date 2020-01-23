const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, movie_id;

describe('/api/movies Tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send(
                { username: 'VeliBaba', password: '12345' }
            ).end((err, res) => {
                token = res.body.token;
                done();
            })
    });
    describe('/GET movies', () => {
        it('it should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })
    });
    describe('/POST Movie', () => {
        it('it should POST a movie', (done) => {
            const movie = {
                title: 'UdemyTest',
                director_id: '5a34e1afb8523a78631f8540',
                category: 'Komedi',
                country: 'Türkiye',
                year: 1980,
                imdb_score: 6
            };
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    movie_id = res.body._id;
                    done();
                })
        })
    })
    describe('/GET/:movie_id movie', () => {
        it('it should  GET a movie by the given id', (done) => {
            chai.request(server)
                .get('/api/movies/id/' + movie_id)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movie_id);
                    done();
                })
        })
    })
})