
function get_view(view_path, parameter){
        var content_json;
        $.ajax({
            url: "http://139.162.199.80/nricrestapi/views/" + view_path + parameter,
            type: "get",
            crossDomain: true,
            async: false,
            error: function(jqXHR, textStatus, errorThrown){
                    console.log(errorThrown);
            },
            success: function(data){
                    // Parse data here 
            },
        });
    return content_json;
}

function get_node(node_id){
    var content_json;
    $.ajax({
        url:"http://139/162.199.70/nricrestapi/node/" + node_id,
        type: "get",
        crossDoamin: true,
        async: false,
        error: function(jqXHR, textStatus, errorThrown,){
            console.log(errorThrown);
        },
        success: function(data){
            // Parse node data here
        },
    });
    return content_json;
}


