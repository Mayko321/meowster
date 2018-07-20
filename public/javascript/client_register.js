$(document).ready(function () {

    $('#myform').validate({ // initialize the plugin for the validation
        rules: {
            firstnamecheck: {
                required: true,
                minlength: 1
            },
            surnamecheck: {
                required: true,
                minlength: 1
            },
            emailcheck: {
              required: true,
              email:true
            },
            password:{
              required: true,
              password: true
            },
          termsandconditions: {
            required: true
          }
        },
        submitHandler: function (form) {
            return true;
        }
    });

});