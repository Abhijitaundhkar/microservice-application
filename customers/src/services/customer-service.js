const customerModel = require("../database/model/customer-model");
const addressModel = require("../database/model/address-model");
const { APIError, ValidationError } = require("../utlis/app-error");
const {
  generateSalt,
  generatePassword,
  validatePassword,
} = require("../utlis/passwords");
const {
  generateSignature,
  validSignature,
  authentication,
} = require("../middleware/authentication");
class CustomerService {
  async signUp(userInput) {
    try {
      const { email, password, phone } = userInput;
      console.log(email, password, phone);
      const existingUser = await customerModel.findOne({ email });

      if (existingUser) {
        throw new ValidationError("User already exists");
      }
      //create salt
      let salt = await generateSalt();
      let userPassword = await generatePassword(password, salt);
      let customer = new customerModel({
        email,
        password: userPassword,
        phone,
        salt,
        address: [],
      });
      if (customer) {
        const customerResult = await customer.save();
        console.log(customerResult);
        const token = await generateSignature({
          email: email,
          _id: customerResult._id,
        });
        return customerResult;
      }
    } catch (err) {
      console.error("SignUp Error:", err);
      throw new APIError("Failed to create user", 500, err.message);
    }
  }
  async logIn(email, password) {
    try {
      const existingUser = await customerModel.findOne({ email });
      if (!existingUser) {
        throw new ValidationError("User not exists");
      }
      let verifyPassword = await validatePassword(
        password,
        existingUser.password,
        existingUser.salt
      );
      if (!verifyPassword) {
        throw new ValidationError("password not match");
      }
      if (verifyPassword && existingUser.email) {
        const token = await generateSignature({
          email: existingUser.email,
          _id: existingUser._id,
        });
        return { id: existingUser._id, token: token };
      }
    } catch (err) {
      console.error("login Error:", err);
      throw new APIError("Failed to login user", 500, err.message);
    }
  }
  async addNewAddress(_id, street, postalCode, city, country) {
    try {
      const profile = await customerModel.findById(_id);
      let newAddress = new addressModel({
        _id,
        street,
        postalCode,
        city,
        country,
      });
      await newAddress.save();
      //profile.address.push(newAddress);
      await profile.save();
      return newAddress;
    } catch (err) {
      console.error("add New Address Error:", err);
      throw new APIError("add New Address", 500, err.message);
    }
  }

  async getProfile(id) {
    try {
      const existingCustomer = await customerModel
        .findById(id)
        .populate("address");
      // existingCustomer.cart = [];
      // existingCustomer.orders = [];
      // existingCustomer.wishlist = [];

      // await existingCustomer.save();
      if (existingCustomer) {
        return existingCustomer;
      }
    } catch (err) {
      console.error("unable to get profile:", err);
      throw new APIError(`"get profile"`, 500, err.message, true);
    }
  }
  async GetShoppingDetails(id) {
    const existingCustomer = await customerModel
      .findById(id)
      .populate("address");
    if (existingCustomer) {
      // const orders = await this.shopingRepository.Orders(id);
      return existingCustomer;
    }
    return { msg: "unable to GetShoppingDetails" };
  }
  async addToWishList(_id, names, description, banner, available, price) {
    const profile = await customerModel.findByIdAndUpdate(
      _id,
      {
        $push: {
          wishList: { _id, names, description, banner, available, price },
        },
      },
      { new: true, useFindAndModify: false }
    );
    return profile;
  }
  async GetWishList(id) {
    const wishItem = await customerModel.findById(id);
    console.log(wishItem);
    if (wishItem) {
      return wishItem;
    }
    return { msg: "unable to get wishlist" };
  }
}
module.exports = CustomerService;
