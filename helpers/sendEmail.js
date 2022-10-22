const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const msg = { ...data, from: "olshanskayulya@gmail.com" };
  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendEmail;
