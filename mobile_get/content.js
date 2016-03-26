function get_view(view_path, parameter){
        var path = ""; // Path to a view
        var para = ""; // Parameter to a view
        var content_json;
        $.ajax({
            url: "http://139.162.199.80/nricrestapi/views/" + path + para,
            type: "get",
            crossDomain: true,
            async: false,
            error: function(jqXHR, textStatus, errorThrown){
                    console.log(errorThrown);
            },
            success: function(token){
                    // Do something with token
            },
        });
    return content_json;
}

