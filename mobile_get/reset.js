// get CSRF token

var user_response;

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


var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://139.162.199.80/nricrestapi/user/request_new_password",
  "method": "POST",
  
  "headers": {
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "username": "team42"
  }
};

$(document).ready(function(){ 
        $("#button").click( fucntion(){
            $.ajax(settings).done(  function (response) {
                                  user_response = response;
                                });
    });
});
