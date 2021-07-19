const Razorpay = require("razorpay");
const shortId = require("shortid");
const Plans = require("../models/plans");

const key_id = "rzp_test_SqGnmB8KZwCrn4";
const key_secret = "tTFAt2zJT57cO9qtnkPAQM9E";

module.exports.initiateOrder = (paymentDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      let choosePlan = await Plans.findOne({ name: paymentDetails.plan });
      console.log(choosePlan);

      const instance = new Razorpay({
        key_id: key_id,
        key_secret: key_secret,
      });

      let options = {
        amount: choosePlan.amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: shortId.generate(),
        payment_capture: 1,
      };

      let order = await instance.orders.create(options);
      console.log(order);
      resolve(order);
    } catch (error) {}
  });
};
