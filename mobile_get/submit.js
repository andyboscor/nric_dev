function submit(title, url, csrf-token)
{
    var obj = "{\n \"webform\":\"9b8991f2-60ba-47bd-919e-138025fa0d06\",\n \"submission\":{\n \"data\":{\n \"1\":{ \"values\":null },\n \"2\":{ \"values\": [\""+ title + "\"] },\n \"3\":{ \"values\": [\""+ url+ "\"] }\n }\n }\n}" 
        $.ajax({
        url: "http://139.162.199.80/nricrestapi/submission",
        type: 'POST',
        headers: { 'X-CSRF-Token': csrf-token },
        dataType: 'json',
        contentType: 'application/json',
        data: obj,
        crossDomain: true,
        async: false,
        error: function(errorThrown){
            console.log(errorThrown.status);
            console.log(errorThrown);
            console.log(errorThrown.responseText);
        }
        success: function(data){
            // server  response with updated json 
            // Print( Thank you for submission)
        }

    })

}
