const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({ hi: 'there' });
    },

    create(req, res, next) {
        const driverProps = req.body

        Driver.create(driverProps)
            .then( driver => res.send(driver))
            .catch(next);

    },

    edit(req, res, next) {
        const driverID = req.params.id;
        const driverProps = req.body;
        
        Driver.findByIdAndUpdate({ _id: driverID }, driverProps)
              .then(() => Driver.findById({ _id: driverID }))
              .then( driver => res.send(driver))
              .catch(next);
    },

    delete(req, res, next) {

        const driverId = req.params.id;
        
        Driver.findByIdAndRemove({ _id: driverId })
            .then( driver => res.status(204).send(driver))
            .catch(next);

    },

    index(req, res, next) {

        const { lng, lat } = req.query;
        console.log(lng);
        // Driver.geoNear(
        //     { type: 'Point', coordinates: [lng, lat] },
        //     { spherical: true, maxDistance: 200000 }
        // )
        Driver.aggregate(
            [{
                $geoNear: {
                    near : { type:'Point', coordinates:[parseFloat(lng), parseFloat(lat)]},
                    spherical: true,
                    maxdistance: 200000,
                    distanceField: 'dist.calculated'
                }
            }
            ])
        .then( drivers => res.send(drivers) )
        .catch(next);

    }

}