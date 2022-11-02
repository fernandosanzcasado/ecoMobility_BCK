const estacionesRepository = require("../repository/estaciones.repository");
const EstacionNotFoundError = require("../../../errors/estaciones.errors/estacionNotFound");

const { v4: uuidv4 } = require("uuid");

//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class estacionesService {
  async scanTable() {
    const data = await estacionesRepository.scanTable();
    return data.Items;
  }

  async getTableCoord() {
    const data = await estacionesRepository.getTableCoord();
    return data.Items;
  }

  async getTableDir() {
    const data = await estacionesRepository.getTableDir();
    return data.Items;
  }

  async findById(estacionId) {
    const data = await estacionesRepository.findById(estacionId);
    if (!data.Item) {
      throw new EstacionNotFoundError();
    } else return data.Item;
  }

  async getCoordById(estacionId) {
    const data = await estacionesRepository.coordById(estacionId);
    if (!data.Item) {
      throw new EstacionNotFoundError();
    } else return data.Item;
  }

  async getDirById(estacionId) {
    const data = await estacionesRepository.dirById(estacionId);
    if (!data.Item) {
      throw new EstacionNotFoundError();
    } else return data.Item;
  }

  async postEstacion(data) {
    const estacion = data;
    estacion.ID = uuidv4();
    const newEstacion = estacionesRepository.postOrUpdateEstacion(estacion);
    return newEstacion;
  }

  async update(estacionID, data) {
    const estacion = await estacionesRepository.findById(estacionID);
    if (!estacion.Item) {
      throw new EstacionNotFoundError();
    } else {
      Object.entries(data).forEach(([key, value]) => {
        estacion.Item[key] = value;
      });
    }
    const updatedEst = await estacionesRepository.postOrUpdateEstacion(
      estacion.Item
    );
    return updatedEst;
  }

  async deleteByID(estacionID) {
    const data = await estacionesRepository.deleteByID(estacionID);
    console.log(data);
    if (!data.Attributes) {
      throw new EstacionNotFoundError();
    } else return data.Item;
  }
}

module.exports = new estacionesService();
