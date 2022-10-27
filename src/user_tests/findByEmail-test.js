const userService = require("../../modules/estaciones/service/user.service");
const userRepository = require("../modules/user/repository/user.repository");

const mockResponse = {
  Item: {
    ID: "Hola",
    ADREÇA: "C/Jordi Girona, 1-3",
  },
};

beforeEach(() => {
  jest.spyOn(userRepository, "findByEmail").mockReturnValue(mockResponse);
});
afterEach(() => {
  jest.spyOn(userRepository, "findByEmail").mockRestore();
});

describe("Scan Table estaciones testing!", () => {
  test("Passarà el test ja que només ha de cridar a la funció scanTable de estacionesRepository", () => {
    userService.findByEmail();
    expect(userRepository.findByEmail()).toHaveBeenCalled();
  });
});
create - test.js;
