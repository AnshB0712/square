const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "anshulbhorde421@gmail.com",
    pass: "zvwxwzuxvjpyodra",
  },
});

const sendMailToUser = async ({ to, subject, text }) => {
  try {
    const info = await transporter.sendMail({
      from: "Anshul 👻", // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { sendMailToUser };
