const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");

app.get("/", (req, res) => {
  res.send({ message: "all good" });
});

app.get("/paytabs", async (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "SHJN6KTM9G-J6W6WR6GTN-G2RMKNRWKK");

  var raw = JSON.stringify({
    profile_id: 103400,
    tran_type: "sale",
    tran_class: "ecom",
    cart_id: "yuy67-d91e-45a9-ac9e-d1b34d49bad9",
    cart_description: "Dummy Order 4696563498614784",
    cart_currency: "SAR",
    cart_amount: 1.234,
    customer_details: {
      name: "John ",
      email: "smith@gmail.com",
      street1: "407, 11th st, void",
      city: "Dubai",
      state: "DUB",
      country: "AE",
      ip: "91.94.146.168",
    },
    callback: "HTTPS://",
    paypage_lang: "en",
    hide_shipping: true,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let payTabData = await fetch(
    "https://secure.paytabs.sa/payment/request",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      res.send(result.redirect_url);
      let message = result.redirect_url;
    })

    .catch((error) => console.log("error", error));
});

app.listen(3000, () => {
  console.log("running on port 3000");
});
