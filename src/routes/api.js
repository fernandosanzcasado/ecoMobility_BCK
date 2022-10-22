const userController = require('../modules/user/controller/user.controller');
const estacionesController = require('../modules/estaciones/controller/estaciones.controller');


module.exports = async(app) =>{
    app.get(`/api/v1/users/:Id`, userController.findById);
    app.post(`/api/v1/users`, userController.create);

    app.get(`/api/v1/estaciones`, estacionesController.scanTable)
    app.get(`/api/v1/estaciones/coordenadas`, estacionesController.getTableCoord)
    app.get(`/api/v1/estaciones/direccion`, estacionesController.getTableDir)
    app.get(`/api/v1/estaciones/:Id`, estacionesController.findById)
    app.get(`/api/v1/estaciones/:Id/coordenadas`, estacionesController.getCoordById);
    app.get(`/api/v1/estaciones/:Id/direccion`, estacionesController.getDirById);
    //app.delete(`/api/v1/estaciones(:ID)`, estacionesController.deleteByID);
    //app.post(`/api/v1/estaciones`, estacionesController.create);
};