function  get_news_archive(search_key, per_page, start_from /*entry number*/)
{
    urle = "http://139.162.199.80/nricrestapi/views/news_archive?";
    urle += "&offset=" + start_from;
    urle += "&limit=" + per_page;
    // Replace spaces with '+' 
    urle += "&keys=" + search_key.replace(/ /g, '+'); 
    $.ajax({
        url: urle,
        type: "get",
        crossDomain: true,
        async: false,
        dataType: 'text',
        contentType: 'application/json',
        error: function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        },
        success: function(data){
            data = JSON.parse($.trim(data));
            console.log(data);
        }
    })
}
