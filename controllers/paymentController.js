const asyncHandler = require("express-async-handler");
const Stripe = require("stripe");

const stripe = require("stripe")(
  "sk_test_51MhzlcJggWefJ04ANPv4Gf4MCvQCWWyjeeAWByiT8ncL3FgYbMfQ0HZYoihqDYXIqltVKsBwUFkhaMwyhxbaTeTk002Z92cnlV"
);

const YOUR_DOMAIN = "http://localhost:3000/";

const createSubscription = asyncHandler(async (req, res) => {
  try {
    const { name, email, paymentMethod, priceId } = req.body;
    // create a new customer for subscription
    const customer = await stripe.customers.create({
      name: name,
      email: email,
      payment_method: paymentMethod,
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
    });
    // now create a subscription for that customer
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_settings: {
        payment_method_options: {
          card: {
            request_three_d_secure: "any",
          },
        },
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
    });
    res.json({
      error: false,
      message: "subcription created successfully.",
      data: {
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        subscriptionId: subscription.id,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `${error.message}`,
      data: null,
    });
  }
});
const unSubscriped = asyncHandler(async (req, res) => {
  try {
    console.log("sfdsf", req.body.subscriptionId);
    const subscription = await stripe.subscriptions.cancel(
      req.body.subscriptionId
    );
    console.log("aaaa", subscription);
    res.json({
      error: false,
      message: "successfully unsubscriped!!",
      data: subscription,
    });
  } catch (error) {}
});
const checkoutSession = asyncHandler(async (req, res) => {
  console.log("api called");
  const { price } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: `${price}`,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    console.log(session);
    // res.redirect(303, session.url);
  } catch (error) {
    console.log(error);
  }
});
module.exports = {
  createSubscription,
  unSubscriped,
  checkoutSession,
};
