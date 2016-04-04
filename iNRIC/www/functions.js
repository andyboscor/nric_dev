$(window).load(function(){
      if(!($("a#home").hasClass('active')))
      {
        $("a#home img#home").attr('src',"img/home.svg");
    }
    else {
        $("a#home img#home").attr('src',"img/homeactive.svg");
    }
});
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
    function searching(form)
    {
        var err = false;
var obj = "test"; // search key
$.ajax({
    url:"http://139.162.199.80/nricrestapi/views/latest_news",
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

        if (data.uid != null) {
            err = false;
            console.log(data);
        }
    }
});
return err;
};
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
            //console.log(data);
            console.log('aici');
            jQuery.each(data, function(i, val) {
                if(i>5) return false;
                desiredLink = "http://139.162.199.80/node/" + val.nid;
                desiredText = val.title;
                desiredDate = val.node_created;
                $('<div class="inner"><div class="title1"><a class="title2" href="#infocus" onclick="window.open(\''+desiredLink+'\', \'_blank\', \'location=yes\');">'+desiredText+'</a><p class="data1">'+ desiredDate + '</p></div></div>').appendTo($('#recent'));

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
            console.log('aici2');
            jQuery.each(data, function(i, val) {
                //if(i>5) return false;
                desiredLink = val.link;
                desiredText = val.nid;
                desiredDate = val.node_created;
                $('<div class="inner"><div class="title1"><a class="title2" href="#infocus" onclick="window.open(\''+desiredLink+'\', \'_blank\', \'location=yes\');">'+desiredText+'</a><p class="data1">'+ desiredDate + '</p></div></div>').appendTo($('#training'));

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
            //console.log(data);
            console.log('aici1');
            jQuery.each(data, function(i, val) {
                //if(i>5) return false;
                desiredLink = val.link;
                desiredText = val.node_title;
                desiredDate = val.node_created;

           // $('<div class="inner"><div class="title1"><a class="title2" href="#home" onclick="window.open(\''+desiredLink+'\', \'_blank\', \'location=yes\');">'+desiredText+'</a><p class="data1">'+ desiredDate + '</p></div></div>').appendTo($('#training'));

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
            console.log('aici');
            jQuery.each(data, function(i, val) {
                //if(i>5) return false;
                desiredLink = val.link;
                desiredText = val.link;
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
/*
function getuserinfo()
{
    var cookie = sessionStorage.sessname + "=" + sessionStorage.sessid;
    console.log(cookie);
    var err = false;
    var obj = "{\"Cookie\": \"" + cookie + "\" }";

$.ajax({
url: "http://139.162.199.80/nricrestapi/system/connect.json",
type: 'POST',
dataType: 'json',
contentType: 'application/json',
crossDomain: true,
async:false,
data: '',
 beforeSend: function (request) {
        request.setRequestHeader("X-CSRF-Token", sessionStorage.token);
      }, 
error: function(XMLHttpRequest, textStatus, errorThrown) {
console.log(JSON.stringify(XMLHttpRequest));
console.log(textStatus);
console.log(errorThrown);
console.log(sessionStorage.token);
if (XMLHttpRequest.status == "200" )
    {    err = false;
        console.log(err);
    }
},
success: function (data) {
console.log('logout successful');
}

});
return err;
};
*/
function profilepage()
{
    var desiredName = sessionStorage.name;
    var desiredEmail = sessionStorage.mail;
    var email = '<a class="email" id="prof_email">' + desiredEmail + ' </a>';
    document.getElementById("prof_name").innerHTML = desiredName + email;

};
var flag1 = true;
var flag2 = true;
var flag3 = true;
$( document ).ready(function() {
    news();
    recent();
    headline();
    profilepage();
    
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
                conferences();
                usefullinks();
                console.log('2');
                flag2=false;
            }
        }
        if(!($("a#profile").hasClass('active')))
        {
            $("a#profile img#profile").attr('src',"img/profile.svg");
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