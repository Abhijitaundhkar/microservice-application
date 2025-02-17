const CustomerService = require("../services/customer-service");
const customerService = new CustomerService();
const { APIError, ValidationError } = require("../utlis/app-error");

class CustomerController {
  async signUp(req, res, next) {
    try {
      const { email, password, phone } = req.body;
      console.log(email, password, phone);
      if (!email || !password) {
        throw new ValidationError("email and password required");
      }
      const data = await customerService.signUp({ email, password, phone });
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: data,
      });
    } catch (err) {
      next(err);
    }
  }
  async logIn(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new ValidationError("email and password required");
      }
      const data = await customerService.logIn(email, password);
      return res.status(200).json({
        success: true,
        message: "User logged in",
        user: data,
      });
    } catch (error) {
      next(error);
    }
  }
  async addNewAddress(req, res, next) {
    try {
      const { _id } = req.user;
      const { street, postalCode, city, country } = req.body;
      const data = await customerService.addNewAddress(
        _id,
        street,
        postalCode,
        city,
        country
      );
      return res.status(201).json({
        success: true,
        message: "User address created successfully",
        address: data,
      });
    } catch (err) {
      next(err);
    }
  }
  async getProfile(req, res, next) {
    try {
      const { _id } = req.user;
      const data = await customerService.getProfile({ _id });
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  async getShopingDetails(req, res, next) {
    const { _id } = req.user;
    const data = await customerService.GetShoppingDetails({ _id });

    return res.json(data);
  }
  async addToWishList(req, res, next) {
    const { _id } = req.user;
    const { names, description, banner, available, price } = req.body;
    const data = await customerService.addToWishList({
      _id,
      names,
      description,
      banner,
      available,
      price,
    });

    return res.json(data);
  }
  async getWishList(req, res, next) {
    const { _id } = req.user;
    const data = await customerService.GetWishList({ _id });
    return res.status(200).json(data);
  }

  // app.get('/whoami', (req,res,next) => {
  //     return res.status(200).json({msg: '/customer : I am Customer Service'})
  // })
}
module.exports = CustomerController;
