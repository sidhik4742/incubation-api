const { initiateOrder } = require("../helpers/razorPay");

// get payment details
exports.getPaymentDetails = async (req, res) => {
  try {
    const details = req.body;
    console.log(details);
    if (details.plan === " " || details.plan === "") {
      res.status(200).json({ messge: "No matching plans found", result: null });
    }
    let orderInitiated = await initiateOrder(details);
    res.status(200).json({ messge: "order created", result: orderInitiated });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
