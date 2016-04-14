function update_filter(filters /*array of string*/,csrf-token, uid){
    
    var obj = "{\"field_placement_settings\":{\"und\":{";
       
        // \"Settings-Community\":\"Settings-Community\"" 
        
        if (filters.length() == 1){
            object+= filters;
        }
        else{ 
            for (var i in filters)
            {
                obj += "\"" + i + "\":\"" + i + "\",";
                 
            }
        }
    obj+="}}}";
    
    $.ajax({
        url: "http://139.162.199.80/nricrestapi/user"+uid,
        type: 'PUT',
        headers:{'X-CSRF-Token': csrf-token};
        dataType: 'json',
        contentType: 'application/json',
        data:ojb,
        crossDomain:true,
        async:false,
        error: function(errorThrown){
            console.log(errorThrown.status);
            console.log(errorThrown);
            console.log(errorThrown.responseText);
        }
        success: function(data){
            // server response with updated json
            // print(Successfully updated)
        }
    }) 
}
