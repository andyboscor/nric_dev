window.user_json;
// TODO 
// get CSRF token

$.ajax({
  url: "http://139.162.199.80/services/session_token",
  type: "get",
  dataType:"text",
  error: function (jqXHR, textSatus, errorThrown){
    alert(errorThrown);
  }
  success: function (token){
    $.ajaxSetup({
      beforesend: function(request){
        request.setRequestHeader("X-CSRF-Token", token);
      },
    });
  }
});
// CSRF token injection
// get fields value
// login failure condition.

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://139.162.199.80/nricrestapi/user/login",
  "method": "POST",
  
  "headers": {
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "username": "team42",
    "password": "123456"
  }
};

$(document).ready(function(){ 
        $("#button").click( fucntion(){
            $.ajax(settings).done(  function (response) {
                                  user_json = response;
                                });
    });
});
