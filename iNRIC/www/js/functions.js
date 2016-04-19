    function logout()
    {
        var cookie = sessionStorage.sessname + "=" + sessionStorage.sessid;
        console.log(cookie);
        var err = false;
        var obj = "{\"Cookie\": \"" + cookie + "\" }";

        $.ajax({
            url: "http://139.162.199.80/nricrestapi/user/logout",
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            crossDomain: true,
            async:false,
            data: obj,
            beforeSend: function (request) {
                //request.setRequestHeader('Access-Control-Allow-Origin', '*');
                request.setRequestHeader("X-CSRF-Token", sessionStorage.token);
            }, 
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(JSON.stringify(XMLHttpRequest));
                console.log(textStatus);
                console.log(errorThrown);
                console.log(sessionStorage.token);
                if (XMLHttpRequest.status == "200" )
                    {    err = true;
                        console.log(err);
                    }
                },
                success: function (data) {
                    console.log('logout successful');
                }

            });
        return err;
    };
function contribute(form)
{
	var title = form.title.value;
	var url = form.url.value;
	console.log(title);
	var obj = "{\n \"webform\":\"9b8991f2-60ba-47bd-919e-138025fa0d06\",\n \"submission\":{\n \"data\":{\n \"1\":{ \"values\":null },\n \"2\":{ \"values\": [\""+ title + "\"] },\n \"3\":{ \"values\": [\""+ url+ "\"] }\n }\n }\n}"; 
    $.ajax({
        url: "http://139.162.199.80/nricrestapi/submission",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: obj,
        crossDomain: true,
        async: false,
        beforeSend: function (request) {
                request.setRequestHeader("X-CSRF-Token", sessionStorage.token);
            }, 
        error: function(errorThrown){
            console.log(errorThrown.status);
            console.log(errorThrown);
            console.log(errorThrown.responseText);
            if(errorThrown.status == 200)
            {
            	$('#response').empty();  
            	$('<p class="messg2">Succesfully Submitted</p>').appendTo($('#response'));
            }
            else {
            	$('#response').empty();  
            	$('<p class="messg2">Something went wrong. Please try again</p>').appendTo($('#response'));
            }
        },
        success: function(data){
            // server  response with updated json 
            // Print( Thank you for submission)
            $('<p>Succesfully Submitted</p>').appendTo($('#response'));
          
            console.log(data);
        }

    });
 };
function searching(form)
    {
        var err = false;
        var checkit = "check";
        var searchfor = form.search.value;
        var category = form.category.value;
        console.log(category);
        var keys="";
        for(i=1;i<=128;i++)
        {   
           check = checkit + i;
            if(form.elements[check].checked == true)
                { keys= keys + form.elements[check].value + '+'; console.log(keys);}
        }
        if(searchfor)
        {
            keys = keys + searchfor + '+';
        }
        if(category)
        {
            keys = keys + category + '+';
        }
        if(keys!="")
        {
            keys = keys.substring(0, keys.length - 1);
        }
        console.log(keys);
        var obj = "test"; // search key
        var urle = encodeURI("http://139.162.199.80/nricrestapi/views/resources?keys=" + keys);
        //console.log(urle);
        $.ajax({
            url: urle,
            type: "get",
            crossDomain: true,
            async: false,  
            dataType: 'text',
            contentType: 'application/json',
            data: obj,
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);

            },
            success: function(data){
                data = JSON.parse($.trim(data));
                console.log(data);
            $('#wrap').hide();
            $('#searchresults').empty();            
            $('<input type="button" class="back" style="right:10px;"onclick="$(\'#searchresults\').hide(); $(\'#wrap\').show();" value="< Back" />').appendTo($('#searchresults'));
            if(data.length==0)
                $('<div class="messg1"><p class="messg"> no results found </p></div>').appendTo($('#searchresults'));
            jQuery.each(data, function(i, val) {
            //if(i>5) return false;
            desiredLink = "http://139.162.199.80/node/" +val.nid;
            desiredText = val.title;
            desiredData = val.body;
            desiredSource = val["level of evidence"];
            desiredDate = val.unknown +" | " + desiredSource;

            //console.log(desiredSource);
                $('<div class="inner"><div class="title1"><a class="title" href="#home" onclick="window.open(\''+desiredLink+'\', \'_blank\', \'location=yes\');">'+desiredText+'</a><p class="information">'+ desiredDate + '</p></div></div>').appendTo($('#searchresults'));


            //console.log(desiredLink);
        });
            $('<div class="filler"></div>').appendTo($('#searchresults'));
            $('#searchresults').show();
                if (data.uid != null) {
                    err = false;
                    console.log(data);
                }
            }
        });
        return err;
    };
    function forgot_pass(form){
    var name = sessionStorage.mail;
    var obj = "{\"name\": \"" + name + "\" }";
                      console.log(obj);
                      $.ajax({
                        url: "http://139.162.199.80/nricrestapi/user/request_new_password.json",
                        type: "POST",
                        dataType: 'json',
                        contentType: 'application/json',
                        data:  obj,
                        crossDomain: true,
                        async:false,
                      //might need to request new token?
                      beforeSend: function (request) {
                      //request.setRequestHeader('Access-Control-Allow-Origin', '*');
                      request.setRequestHeader("X-CSRF-Token", sessionStorage.token);
                      }, 
                        error: function(errorThrown) {
                     
                 
                            if(errorThrown.status == "200")
                              { 
                              	$('#infopassrs').hide();
                              	$('<label class="profile">Check your email!</label>').appendTo("#passrs");
                                //console.log("request sent1");
                              } else {
                              	$('#infopassrs').hide();
                              	$('<label class="profile">Oops! Something went wrong! Please try again.</label>').appendTo("#passrs");
                              }
                             
                    },
                    success: function (data) {
                          
                          console('no errors');
                          if(data.status == "200")
                              { 
                                $('#infopassrs').hide();
                              	$('<label class="profile">Check your email!</label>').appendTo("#passrs");
                                //console.log("request sent");
                              } 
                          
                    }
    });
                      return false;

}
function news()
{
    $.ajax({
        url:"http://139.162.199.80/nricrestapi/views/latest_news",
        type: "get",
        crossDomain: true,
        async: false,  
        dataType: 'text',
        contentType: 'application/json',
        data: '' ,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);

        },
        success: function(data){
            data = JSON.parse($.trim(data));
            //console.log(data);
            jQuery.each(data, function(i, val) {
                desiredLink = val.link;
                desiredText = val.title;
                //desiredDate = val.
                $('<div class="inner"><div class="title1"><a class="title2" href="#home" onclick="window.open(\''+desiredLink+'\', \'_blank\', \'location=yes\');">'+desiredText+'</a></div></div>').appendTo($('#latest_news'));
            });
            if (data.uid != null) {

                //console.log(data);
            }
        }
    });
};
function recent()
{
    $.ajax({
        url:"http://139.162.199.80/nricrestapi/views/recently_added_resources",
        type: "get",
        crossDomain: true,
        async: false,  
        dataType: 'text',
        contentType: 'application/json',
        data: '' ,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);

        },
        success: function(data){
            data = JSON.parse($.trim(data));
          //  console.log(data);
          jQuery.each(data, function(i, val) {
            if(i>5) return false;
            desiredLink = "http://139.162.199.80/node/" + val.nid;
            desiredText = val.title;
            desiredDate = val.node_created;
            $('<div class="inner"><div class="title1"><a class="title2" href="#home" onclick="window.open(\''+desiredLink+'\', \'_blank\', \'location=yes\');">'+desiredText+'</a><p class="data1">'+ desiredDate + '</p></div></div>').appendTo($('#recent'));
            
            //console.log(desiredLink);
        });
          if (data.uid != null) {

                //onsole.log(data);
            }
        }
    });
};
function headline()
{
    $.ajax({
        url:"http://139.162.199.80/nricrestapi/views/headlines",
        type: "get",
        crossDomain: true,
        async: false,  
        dataType: 'text',
        contentType: 'application/json',
        data: '' ,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);

        },
        success: function(data){
            data = JSON.parse($.trim(data));
           // console.log(data);
           jQuery.each(data, function(i, val) {
            if(i>5) return false;
            desiredLink = val.link;
            desiredText = val.title;
            desiredData = val.body;
            var find = '<p>﻿﻿﻿﻿﻿</p>';
            var re = new RegExp(find, 'g');
            desiredData = desiredData.replace(re, '');
            var find2 = '<p>';
            var re2 = new RegExp(find2, 'g');
            desiredData = desiredData.replace(re2, '<p class="data">');
            var find3 = '<div>';
            var re3 = new RegExp(find3, 'g');
            desiredData = desiredData.replace(re3, '');
            var find4 = '</div>';
            var re4 = new RegExp(find4, 'g');
            desiredData = desiredData.replace(re4, '');
                //desiredData.replace(/'<p>'/g,'');
                //console.log(desiredData);
                $('<div class="inner"><div class="title1"><a class="title" href="#home" onclick="window.open(\''+desiredLink+'\', \'_blank\', \'location=yes\');">'+desiredText+'</a>'+ desiredData + '</div></div>').appendTo($('#headlines'));


            //console.log(desiredLink);
        });
           if (data.uid != null) {

                //console.log(data);
            }
        }
    });
};
function infocus()
{
    $.ajax({
        url:"http://139.162.199.80/nricrestapi/node/54121",
        type: "get",
        crossDomain: true,
        async: false,  
        dataType: 'text',
        contentType: 'application/json',
        data: '' ,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);

        },
        success: function(data){
            data = JSON.parse($.trim(data));
            console.log(data);
            console.log('aici');
            jQuery.each(data, function(i, val) {
                if(i>5) return false;
                //desiredLink = "http://139.162.199.80/node/" + val.nid;
                //desiredText = val.title;
                //desiredDate = val.node_created;
                //$('<div class="inner"><div class="title1"><a class="title2" href="#infocus" onclick="window.open(\''+desiredLink+'\', \'_blank\', \'location=yes\');">'+desiredText+'</a><p class="data1">'+ desiredDate + '</p></div></div>').appendTo($('#recent'));

            //console.log(desiredLink);
        });
            if (data.uid != null) {

               // console.log(data);
           }
       }
   });
};
function training()
{
    $.ajax({
        url:"http://139.162.199.80/nricrestapi/views/courses",
        type: "get",
        crossDomain: true,
        async: false,  
        dataType: 'text',
        contentType: 'application/json',
        data: '' ,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);

        },
        success: function(data){
            data = JSON.parse($.trim(data));
            //console.log(data);
            //console.log('aici2');
            jQuery.each(data, function(i, val) {
                //if(i>5) return false;
                desiredLink = val.link;
                desiredText = val.title;
                //desiredDate = val.node_created;
                desiredText2 = val.nid;
                $('<div class="inner"><div class="title1"><a class="title2" href="#infocus" onclick="window.open(\''+desiredLink+'\', \'_blank\', \'location=yes\');">'+desiredText+'</a><p class="data">'+ desiredText2 + '</p></div></div>').appendTo($('#training'));

            //console.log(desiredLink);
        });
            if (data.uid != null) {

               // console.log(data);
           }
       }
   });
};
function conferences()
{
    $.ajax({
        url:"http://139.162.199.80/nricrestapi/views/conferences",
        type: "get",
        crossDomain: true,
        async: false,  
        dataType: 'text',
        contentType: 'application/json',
        data: '' ,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);

        },
        success: function(data){
            data = JSON.parse($.trim(data));
            console.log(data);
            console.log('aici1');
            jQuery.each(data, function(i, val) {
                //if(i>5) return false;
                desiredLink = val.link;
                desiredText = val.node_title;
                desiredDate = val.node_created;

            $('<div class="inner"><div class="title1"><a class="title2" href="#links" onclick="window.open(\''+desiredLink+'\', \'_blank\', \'location=yes\');">'+desiredText+'</a><p class="data1">'+ desiredDate + '</p></div></div>').appendTo($('#conferences'));

            //console.log(desiredLink);
        });
            if (data.uid != null) {

               // console.log(data);
           }
       }
   });
};
function usefullinks()
{
    $.ajax({
        url:"http://139.162.199.80/nricrestapi/views/directory",
        type: "get",
        crossDomain: true,
        async: false,  
        dataType: 'text',
        contentType: 'application/json',
        data: '' ,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);

        },
        success: function(data){
            data = JSON.parse($.trim(data));
            //console.log(data);
            //console.log('aici');
            jQuery.each(data, function(i, val) {
                //if(i>5) return false;
                desiredLink = val.link;
                desiredText = val.title;
                //desiredDate = val.node_created;

                $('<div class="inner"><div class="title1"><a class="title2" href="#links" onclick="window.open(\''+desiredLink+'\', \'_blank\', \'location=yes\');">'+desiredText+'</a></div></div>').appendTo($('#useful'));

            //console.log(desiredLink);
        });
            if (data.uid != null) {

               // console.log(data);
           }
       }
   });
};

function getuserpref()
{
   

$.ajax({
url: "http://139.162.199.80/nricrestapi/user/"+sessionStorage.uid,
type: 'GET',
dataType: 'json',
contentType: 'application/json',
crossDomain: true,
async:false,
data: '',
 beforeSend: function (request) {
        request.setRequestHeader("X-CSRF-Token", sessionStorage.token);
      }, 
error: function(XMLHttpRequest, textStatus, errorThrown) {
//console.log(JSON.stringify(XMLHttpRequest));
//console.log(textStatus);
//console.log(errorThrown);
//console.log(sessionStorage.token);
var string = XMLHttpRequest.responseText;
var keys ='';
try{
    var data1 = JSON.parse($.trim(string));

    console.log(data1);
    if(data1.field_region.length!=0)
    { 
        for(i = 0; i<data1.field_region.und.length; i++)
            { keys = keys + data1.field_region.und[i].value + '+';}
 }
 if(data1.field_placement_clinicalpractice.length!=0)
    { 
        for(i = 0; i<data1.field_placement_clinicalpractice.und.length; i++)
            {   var obj = data1.field_placement_clinicalpractice.und[i].value;
                var str = obj.replace("ClinicalPractice-", "");
                keys = keys + str + '+';}
 }
 if(data1.field_placement_settings.length!=0)
    { 
        for(i = 0; i<data1.field_placement_settings.und.length; i++)
            {   var obj = data1.field_placement_settings.und[i].value;
                var str = obj.replace("Settings-", "");
                keys = keys + str + '+';}
 }
 if(data1.field_placement_diseases.length!=0)
    { 
        for(i = 0; i<data1.field_placement_diseases.und.length; i++)
            {   var obj = data1.field_placement_diseases.und[i].value;
                var str = obj.replace("Diseases-", "");
                keys = keys + str + '+';}
 }
 if(data1.field_placement_policy.length!=0)
    { 
        for(i = 0; i<data1.field_placement_policy.und.length; i++)
            {   var obj = data1.field_placement_policy.und[i].value;
                var str = obj.replace("Policy-", "");
                keys = keys + str + '+';}
 }
  if(data1.field_placement_transmission.length!=0)
    { 
        for(i = 0; i<data1.field_placement_transmission.und.length; i++)
            {   var obj = data1.field_placement_transmission.und[i].value;
                var str = obj.replace("Transmission-", "");
                keys = keys + str + '+';}
 }
 if(keys!="")
        {
            keys = keys.substring(0, keys.length - 1);
        }
 console.log(keys);
 var obj = "test"; // search key
        var urle = encodeURI("http://139.162.199.80/nricrestapi/views/resources?keys=" + keys);
        //console.log(urle);
        $.ajax({
            url: urle,
            type: "get",
            crossDomain: true,
            async: false,  
            dataType: 'text',
            contentType: 'application/json',
            data: obj,
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);

            },
            success: function(data){
                data = JSON.parse($.trim(data));
                console.log(data);
            $('#wrap').hide();
            $('#searchresults').empty();            
            $('<input type="button" class="back" style="right:10px;"onclick="$(\'#searchresults\').hide(); $(\'#wrap\').show();" value="< Back" />').appendTo($('#searchresults'));
            if(data.length==0)
                $('<div class="messg1"><p class="messg"> no results found </p></div>').appendTo($('#searchresults'));
            jQuery.each(data, function(i, val) {
            //if(i>5) return false;
            desiredLink = "http://139.162.199.80/node/" +val.nid;
            desiredText = val.title;
            desiredData = val.body;
            desiredSource = val["level of evidence"];
            desiredDate = val.unknown +" | " + desiredSource;

            //console.log(desiredSource);
                $('<div class="inner"><div class="title1"><a class="title" href="#home" onclick="window.open(\''+desiredLink+'\', \'_blank\', \'location=yes\');">'+desiredText+'</a><p class="information">'+ desiredDate + '</p></div></div>').appendTo($('#searchresults'));


            //console.log(desiredLink);
        });
            $('<div class="filler"></div>').appendTo($('#searchresults'));
            $('#searchresults').show();
                if (data.uid != null) {
                    err = false;
                    console.log(data);
                }
            }
        });
}
catch(err){
  console.log(err);
}  
if (XMLHttpRequest.status == "200" )
    {    //err = false;
        //console.log(err);
    }
},
success: function (data) {
console.log('logout successful');
}

});
return false;
};

function updateprofile(form)
{
  var checkit = "check";
  var filters= [];
  var j = 1;
  var key;
  var obj = {};
  var flag1 = false;
  var flag2 = false;
  var flag3 = false;
  var flag4 = false;
  var flag5 = false;
  var flag6 = false;
  for(i=1;i<=6;i++)
  {  
   check = checkit + i;
   if(form.elements[check].checked == true)
    { key = form.elements[check].value;
     flag1 = true;
     if (!('field_region' in obj))
     {
                // If not makeone
                obj['field_region'] = { };
                obj['field_region']['und'] = { };  
            }
                // Append key to category
                obj['field_region']['und'][key]=key;  
            }
        }
        if(flag1==false)
        {
         obj['field_region'] = { };
         obj['field_region']['und'] = { };  
     }
     for(i=7;i<=19;i++)
     {   
       check = checkit + i;
       if(form.elements[check].checked == true)
        { key = form.elements[check].value;
            flag2 = true;
            var str = 'field_placement_clinicalpractice';
            key = key.replace(/\s/g,'');  
            if (!( str in obj))
            {
                obj[str] = { };
                obj[str]['und'] = { }; 
            }
            // Append new key
            obj[str]['und']['ClinicalPractice-' + key]='ClinicalPractice-'+key;
        }
    }
    if(flag2==false)
    {
     obj['field_placement_clinicalpractice'] = { };
     obj['field_placement_clinicalpractice']['und'] = { };   
 }
 for(i=20;i<=34;i++)
 {   
   check = checkit + i;
   if(form.elements[check].checked == true)
    { key = form.elements[check].value;
        flag3 = true;
        var str = 'field_placement_settings';
        key = key.replace(/\s/g,''); 

        if (!( str in obj))
        {
            obj[str] = { };
            obj[str]['und'] = { }; 
        }
            // Append new key
            obj[str]['und']['Settings-'+key]='Settings-' + key;
        }
  }
    if(flag3==false)
    {
     obj['field_placement_settings'] = { };
     obj['field_placement_settings']['und'] = { };   
 }
 for(i=35;i<=114;i++)
 {   
   check = checkit + i;
   if(form.elements[check].checked == true)
    { key = form.elements[check].value;
        flag4 = true;
        var str = 'field_placement_diseases';
        key = key.replace(/\s/g,''); 

        if (!( str in obj))
        {
            obj[str] = { };
            obj[str]['und'] = { }; 
        }
            // Append new key
            obj[str]['und']['Diseases-'+key]='Diseases-' + key;
        }
    }
    if(flag4==false)
    {
     obj['field_placement_diseases'] = { };
     obj['field_placement_diseases']['und'] = { };   
 }
 for(i=115;i<=122;i++)
 {   
   check = checkit + i;
   if(form.elements[check].checked == true)
    { key = form.elements[check].value;
        flag5=true;
        var str = 'field_placement_policy';
        key = key.replace(/\s/g,''); 

        if (!( str in obj))
        {
            obj[str] = { };
            obj[str]['und'] = { }; 
        }
            // Append new key
            obj[str]['und']['Policy-'+key]='Policy-' + key;
        }
    }
    if(flag5==false)
    {
     obj['field_placement_policy'] = { };
     obj['field_placement_policy']['und'] = { };   
 }
 for(i=123;i<=128;i++)
 {   
   check = checkit + i;
   if(form.elements[check].checked == true)
    { key = form.elements[check].value;
        flag6 = true;
        var str = 'field_placement_transmission';
        key = key.replace(/\s/g,''); 

        if (!( str in obj))
        {
            obj[str] = { };
            obj[str]['und'] = { }; 
        }
            // Append new key
            obj[str]['und']['Transmission-'+key]='Transmission-' + key;
        }
    }
    if(flag6==false)
    {
     obj['field_placement_transmission'] = { };
     obj['field_placement_transmission']['und'] = { };   
 }
 var json = JSON.stringify(obj);
 console.log(json);
 console.log(sessionStorage.uid);

 $.ajax({
    url: "http://139.162.199.80/nricrestapi/user/" + sessionStorage.uid,
    type: "PUT",
    dataType: "json",
    contentType: 'application/json',
    data:  json,
    crossDomain: true,
    async:false,
                      //might need to request new token?
                      
                      beforeSend: function (request) {
                      //request.setRequestHeader('Access-Control-Allow-Origin', '*');
                      request.setRequestHeader("X-CSRF-Token", sessionStorage.token);
                  }, 
                  error: function(errorThrown) {
                     console.log(errorThrown.status);
                     console.log(errorThrown);
                     console.log(errorThrown.statusText);
                     if(errorThrown.status == "200")
                     { 

                     } else {

                     }

                 },
                 success: function (data) {

                  console('no errors');
                  if(data.status == "200")
                  { 

                  } 

              }
          });

};
function profilepage()
{
    var desiredName = sessionStorage.name;
    var desiredEmail = sessionStorage.mail;
    if(desiredName == null)
    {
        //window.location.replace("login.html");
    }
    var email = '<a class="email" id="prof_email">' + desiredEmail + ' </a>';
    document.getElementById("prof_name").innerHTML = desiredName + email;

};
var flag1 = true;
var flag2 = true;
var flag3 = true;
$( document ).ready(function() {
    $.support.cors=true;
    if(!($("a#home").hasClass('active')))
      {
        $("a#home img#home").attr('src',"img/home.svg");
    }
    else {
        $("a#home img#home").attr('src',"img/homeactive.svg");
    }
    profilepage();
    news();
    recent();
    headline();
    $('#searchresults').hide();
    

    
    $(".menu li a").click(function(){
        $('.menu li a').not(this).removeClass('active');
        $(this).addClass('active');
        if(!($("a#home").hasClass('active')))
        {
            $("a#home img#home").attr('src',"img/home.svg");
        }
        else {
            $("a#home img#home").attr('src',"img/homeactive.svg");
        }
        if(!($("a#search").hasClass('active')))
        {
            $("a#search img#search").attr('src',"img/search.svg");
            $('#response').empty();  
        }
        else {
            $("a#search img#search").attr('src',"img/searchactive.svg");
        }
        if(!($("a#infocus").hasClass('active')))
        {
            $("a#infocus img#infocus").attr('src',"img/target.png");

        }
        else {
            $("a#infocus img#infocus").attr('src',"img/targetactive.png");
            if(flag1==true)
            {
                training();
                //infocus();
                flag1=false;
            }
        }
        if(!($("a#links").hasClass('active')))
        {
            $("a#links img#links").attr('src',"img/links.svg");

        }
        else {
            $("a#links img#links").attr('src',"img/linksactive.svg");
            if(flag2==true)
            {
                //conferences();
                usefullinks();
                //console.log('2');
                flag2=false;
            }
        }
        if(!($("a#profile").hasClass('active')))
        {
            $("a#profile img#profile").attr('src',"img/profile.svg");
            $('#infopassrs').show();
            $('#passrs').empty();
        }
        else {
            $("a#profile img#profile").attr('src',"img/profileactive.svg");
        };

/*
    if(!$("a img#home").hasClass("active"))
    { $("a img#home").attr('src',"img/home.svg");};
    $(".menu li a.active img#search").attr('src',"img/search.svg");
    $(".menu li a.active img#infocus").attr('src',"img/search.svg");
    $(".menu li a.active img#links").attr('src',"img/search.svg");
    $(".menu li a.active img#profile").attr('src',"img/search.svg"); */
})
});