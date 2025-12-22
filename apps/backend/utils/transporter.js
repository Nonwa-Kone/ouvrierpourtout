const { transporter } = require('../config/nodemailer.config');

/*********************/
//      ADMIN
/*********************/
exports.sendMail = async function (data) {
  try {
    const { email, subject, text, html } = data;
    const mailOptions = {
      from: process.env.GMAIL,
      to: email,
      subject,
      text,
      html,
    };
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('🚀 ~ transporter.sendMail ~ error:', error);
          reject(error);
        } else {
          resolve({
            success: true,
            message: 'Email envoyé avec succès!',
            info,
          });
        }
      });
    });
  } catch (error) {
    console.log('🚀 ~ error:', error);
    throw error;
  }
};
