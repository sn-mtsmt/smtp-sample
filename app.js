// Framework
const express = require("express");
// util
const fs = require("fs");
const dotenv = require("dotenv");
// mailer
const nodemailer = require("nodemailer");
const smime = require("nodemailer-smime");
const smtpapi = require("smtpapi");

const app = express();
const port = 3000;

dotenv.config();
const setting = {
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  requiresAuth: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS
  }
};

const cert = fs.readFileSync("./smime/cert.pem").toString();
const key = fs.readFileSync("./smime/private-key.pem").toString();

const options = { cert, chain: [cert], key };

const mailer = nodemailer.createTransport(setting);
mailer.use("stream", smime(options));

app.get("/", (_req, res) => {
  const tos = ["to@test.com"];

  const header = new smtpapi();
  header.setTos(tos);
  header.addSubstitution("fullname", ["受信 ユーザー"]);
  header.addSubstitution("familyname", ["受信"]);

  const email = {
    from: "from@test.com",
    to: "to@test.com",
    subject: "send subject",
    html: "<strong>send contents</strong>",
    headers: { "x-smtpapi": header.jsonString() }
  };

  mailer.sendMail(email, (e, r) => {
    mailer.close();
    if (e) {
      console.log(e);
      res.send("oops! send error!");
    } else {
      console.log(r);
      res.send("ok! send success!");
    }
  });
});

app.listen(port, () => {});
console.log("during startup");
