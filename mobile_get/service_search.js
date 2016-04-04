var obj = "test"; // search key
    $.ajax({
        url: "http://139.162.199.80/nricrestapi/search_node/retrieve.json?simple=1&keys=" + obj,
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
            console.log(data);
            data = JSON.parse($.trim(data));
            if (data.uid != NULL) {
                err = true;
                console.log(data);
            }
        }
    });