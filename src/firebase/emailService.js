import emailjs from "emailjs-com";
export const sendEmail = (
  to,
  message,
  productName,
  productTotalAmmount,
  status
) => {
  console.log("email");
  emailjs
    .send(
      "service_qa1og5w",
      "template_lpcic6i",
      {
        to: to,
        message: message,
        productName: productName,
        productTotalAmmount: productTotalAmmount,
        status,
      },
      "user_wop403c6j9m1V68RjLkaN"
    )
    .then(() => console.log("mail sent"));
};
