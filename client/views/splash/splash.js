import { Email } from "meteor/email";
Template.splash.events({
  "click #send-email": function (e) {
    console.log("Sending email");
    Email.send({
      to: "kaanuzdogan@hotmail.com",
      from: "test@test.com",
      subject: "Test Email",
      text: "This is a test email from the Meteor Boilerplate.",
    });
  },
});
