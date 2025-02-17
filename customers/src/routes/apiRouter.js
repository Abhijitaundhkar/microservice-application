const { Router } = require("express");
const { authentication } = require("../middleware/authentication");
const CustomerController = require("../controller/customer-controller");

const customerController = new CustomerController();
const router = Router();

router.post("/signUp", customerController.signUp.bind(customerController));
router.post(
  "/logIn",

  customerController.logIn.bind(customerController)
);
router.post(
  "/address",
  authentication,
  customerController.addNewAddress.bind(customerController)
);
router.get(
  "/profile",
  authentication,
  customerController.getProfile.bind(customerController)
);
router.get(
  "/shoping-details",
  authentication,
  customerController.getShopingDetails.bind(customerController)
);
router.post(
  "/addWishList",
  authentication,
  customerController.addToWishList.bind(customerController)
);
router.get(
  "/wishlist",
  authentication,
  customerController.getWishList.bind(customerController)
);
module.exports = router;
