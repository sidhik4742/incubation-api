const Subscribers = require("../models/subscribers");
const Plans = require("../models/plans");
const { initiateOrder } = require("../helpers/razorPay");
const { mailer } = require("../helpers/mailer");

// get payment details
exports.getPaymentDetails = async (req, res) => {
  try {
    const { details, id } = req.body;
    console.log(details, id);
    if (details.plan === " " || details.plan === "") {
      res.status(200).json({ messge: "No matching plans found", result: null });
    }
    let choosePlan = await Plans.findOne({ name: details.plan });
    console.log(choosePlan);
    let orderInitiated = await initiateOrder(details, choosePlan);
    if (orderInitiated) {
      let paymentSlip = {
        user_id: id,
        orderId: orderInitiated.id,
        companyName: details.companyName,
        managerName: `${details.firstName} ${details.lastName}`,
        amount: choosePlan.amount,
        date: Date.now(),
        paymentStatus: true,
      };
      const result = await Subscribers.create(paymentSlip);
      console.log(result, 23);
    }
    const mailService =   mailer({
      email: details.email,
      amount: choosePlan.amount,
      orderId: orderInitiated.id,
      planName: choosePlan.name,
    });
    res.status(200).json({ messge: "order created", result: orderInitiated });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
