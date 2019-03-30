const assert =  require('assert');
const request = require('supertest');
const app = require('../../app');

const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('Drivers Controller', () => {
    it('Post to /api/drivers creates a new driver', (done) => {
        Driver.count().then( count => {
        request(app)
            .post('/api/drivers')
            .send({ email: 'test@test.com' })
            .end( (err, response) => {
                
                Driver.count().then( newCount => {
                    assert( count + 1 === newCount );
                    done();
                });

                
            });
        });  

    });

    it('PUT to /api/drivers/id edits an existing driver', done => {

        const driver = new Driver({ email: 't@t.com', driving: false });
        
        driver.save().then(() => {
            request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({ driving: true })
                .end( (err, response) => {
                    Driver.findOne({ email: 't@t.com' })
                        .then( driver => {
                            assert(driver.driving === true);
                            done();
                        });
                });
        });

    });

    it('PUT to /api/drivers/delete deletes an existing driver', done => {

        const driver = new Driver({ email: 'sam@sam.com', driving: true });

        driver.save().then(()=> {
            request(app)
                .delete(`/api/drivers/${driver._id}`)
                .end((err, response) => {
                    Driver.findOne({ email: 'sam@sam.com' })
                        .then((driver) => {
                            assert(driver === null);
                            done();
                        });
                    
                });
        });

    });

it('GET to /api/drivers find drivers location', done => {
    const seattleDriver = new Driver({
        email: 'seattle@test.com',
        geometry: { type: 'Point', coordinates: [ -122.4759902, 47.6147628 ] }
    });

    const miamiDriver = new Driver({
        email: 'miami@test.com',
        geometry: { type: 'Point', coordinates: [ 80.253, 25.791 ] }
    });

    Promise.all([ seattleDriver.save(), miamiDriver.save() ])
        .then( () => {
            request(app)
                .get('/api/drivers?lng=-80&lat=25')
                .end((err, response)=> {
                    console.log(response.body);
                    //assert(response.body.length === 1);
                    assert(response.body[1].email === 'miami@test.com');
                    done();
                });   
        });

});

});