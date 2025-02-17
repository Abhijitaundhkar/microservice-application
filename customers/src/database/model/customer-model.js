const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    email: String,
    password: String,
    salt: String,
    phone: String,
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
        require: "true",
      },
    ],
    cart: [
      {
        product: {
          _id: { type: String, require: true },
          name: { type: String },
          banner: { type: String },
          price: { type: Number },
        },
        unit: { type: Number, require: true },
      },
    ],
    wishList: [
      {
        id: { type: String, require: true },
        name: { type: String },
        description: { type: String },
        banner: { type: String },
        available: { type: Boolean },
        price: { type: String },
      },
    ],
    orders: [
      {
        id: { type: String, require: true },
        amount: { type: String },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret._v;
      },
    },
    timeStamps: true,
  }
);
module.exports = mongoose.model("customer", customerSchema);
