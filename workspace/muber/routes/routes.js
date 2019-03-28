const DriversController = require('../controllers/driver_controller');

module.exports = (app) => {
    // Watch for incoming requests of GET method
    // to  the route http://localhost:3050/api
    app.get('/api', DriversController.greeting);
    
    
    app.post('/api/drivers', DriversController.create);

   
};
