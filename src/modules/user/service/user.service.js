const { json } = require("body-parser");
const userRepository = require("../repository/user.repository");
const bcrypt = require("bcrypt");

const UserNotFoundError = require("../../../errors/user.errors/userNotFound");
const IncorrectPassword = require("../../../errors/user.errors/incorrectPassword");
const UserAlreadyExists = require("../../../errors/user.errors/userAlreadyExists");

//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class userService {
  async findByEmail(email) {
    const user = await userRepository.findByEmail(email);

    if (!user.Item) {
      throw new UserNotFoundError();
    } else {
      return user.Item;
    }
  }

  async create(data) {
    const newUser = await userRepository.createUser({
      email: data.email,
      name: data.name,
      surnames: data.surnames,
      password: data.password,
    });
    return newUser.Attributes;
  }

  async updateUserInfo(email, data) {
    const user = await userRepository.findByEmail(email);
    if (!user.Item) {
      throw new UserNotFoundError();
    }
    const updatedUser = await userRepository.updateUserInfo(email, data);
    return updatedUser.Attributes;
  }

  async deleteByEmail(email) {
    const deletedUser = await userRepository.deleteUserByEmail(email);
    if (!deletedUser.Attributes) {
      throw new UserNotFoundError();
    }
    return deletedUser.Attributes;
  }


    async updatePassword(email,oldPassword, checkOldPassword, newPassword){
        if(await bcrypt.compare(checkOldPassword, oldPassword )){
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            return await userRepository.updatePassword(email, hashedPassword);
        }else{
            throw new IncorrectPassword();
        }
    }

    async updateInfo(email, info){
        return await userRepository.updateUserInfo(email,info);
    }

    async deleteUser(email){
        return await userRepository.deleteUserByEmail(email);
    }

    async deleteByEmail(email){

    if (!user.Item) {
      throw new UserNotFoundError();
    } else if (user.Item.Password !== data.password) {
      throw new IncorrectPassword();
    } else {
      return user;
    }
  }



    async  loginUser(data){
        const user = await userRepository.findByEmail(data.email);
        
        if(!user.Item){
           throw new UserNotFoundError();
        }else if(user.Item.password !== data.password){
            throw new IncorrectPassword();
        }else{
        return user;
        } 
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await userRepository.createUser({
      email: data.email,
      name: data.name,
      surnames: data.surnames,
      password: hashedPassword,
    });
    return newUser;
  }

  // async canviatrbutsUser() {
  //   const data = await userRepository.scanTable(); //CAL CREARLO Crec
  //   data.forEach((item) => {
  //     for (let key in item) {
  //       if (key == "Is_superuser") newKey = isSuperuser;
  //       if (key == "Date_joined") newKey = dateJoined;
  //       if (key == "Password") newKey = password;
  //       if (key == "Surnames") newKey = surnames;
  //       if (key == "Email") newKey = email;
  //       if (key == "Name") newKey = name;
  //       // renameKey ( Object, key, newKey );
  //       Object[newKey] = Object[oldKey];
  //       delete Object[oldKey];
  //     }
  //   });
  // }
}

module.exports = new userService();
