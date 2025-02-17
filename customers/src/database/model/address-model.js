const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema(
  {
    street: String,
    postalCode: String,
    city: String,
    country: String,
  },
  { collection: "address" } // Forces MongoDB to use "address"
);

module.exports = mongoose.model("address", AddressSchema);

/** for multiple addres add  No need to manually set _id—MongoDB generates it automatically.
 const addressSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  street: String,
  postalCode: String,
  city: String,
  country: String
});

module.exports = mongoose.model("Address", addressSchema);

 * const addAddressToCustomer = async (customerId, addressData) => {
  try {
    const newAddress = await Address.create({ customerId, ...addressData });

    await Customer.findByIdAndUpdate(
      customerId,
      { $push: { addresses: newAddress._id } }, // Push new address reference
      { new: true, useFindAndModify: false }
    );

    console.log("Address added successfully!");
  } catch (err) {
    console.error("Error adding address:", err);
  }
};
 */
