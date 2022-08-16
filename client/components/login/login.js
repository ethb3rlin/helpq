Template.login.onCreated(function() {
  this.error = new ReactiveVar();
});

Template.login.events({
  "click #login-github": function() {
    Meteor.loginWithGithub({
      loginStyle: "redirect"
    });
  },
  "click #login-facebook": function() {
    Meteor.loginWithFacebook({
      loginStyle: "redirect"
    });
  },
  "click #login-password": function(e, t) {
    loginPassword(t);
  },
  "click #mentor-toggle": function(e, t) {
    var passwordElement = document.getElementById("password-block");
    var mentorToggleElement = document.getElementById("mentor-toggle");
    if (mentorToggleElement.checked == true) {
      passwordElement.style.display = "block";
    } else {
      passwordElement.style.display = "none";
    }
  },

  "keyup #password": function(e, t) {
    if (e.keyCode === 13) {
      loginPassword(t);
    }
  }
});

Template.login.helpers({
  enabled: function() {
    var services = {};
    ServiceConfiguration.configurations
      .find({})
      .fetch()
      .forEach(function(service) {
        services[service.service] = true;
      });
    return services;
  },
  error: function() {
    return Template.instance().error.get();
  }
});

Template.login.rendered = function() {
  $(this.findAll(".container")).addClass("animated fadeIn");
};

function loginPassword(t) {
  var cb = document.getElementById("mentor-toggle");
  if (cb.checked == false) {
    document.getElementById("password").value = "password123";
  }
  Meteor.loginWithPassword(
    {username:($(t.findAll("#username"))
      .val()
      .trim())},
    $(t.findAll("#password")).val(),
    function(error) {
      if (error) {
        $(t.findAll("#password")).val("");
        t.error.set(error.reason);
      }
    }
  );
}
