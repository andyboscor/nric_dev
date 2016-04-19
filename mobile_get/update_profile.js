function update_filter_settings(filters /*array of string*/,csrf-token, uid){
  
    // Prepare the object
    var obj = { };
    var len = filters.length;     
     
    // Seperate filters by type 
    for (var i =0; i < len; i++){
        var key = filters[i];
        
        // Handle region category
        if (key.indexOf("-") == -1)
        {
            // Check if category already exist in object
            if (!("field_region" in obj))
            {
                // If not makeone
                obj["field_region"] = { };
                obj["field_region"]["und"] = { };  
            }
                // Append key to category
                obj["field_region"]["und"][key]=key;  
        }

        // For the rest
        else 
        {
           // Get the category name
            var hyphenindex = key.indexOf('-');
            var type = key.substring(0, hyphenindex);
            type = type.toLowerCase();

            // Check if category exist
            if (!("field_placement_"+type in obj))
            {
                obj["field_placement_"+type] = { };
                obj["field_placement_"+type]["und"] = { }; 
            }
            // Append new key
            obj["field_placement_"+type]["und"][key]=key;
        } 
    }
     
   
    
    $.ajax({
        url: "http://139.162.199.80/nricrestapi/user/"+uid,
        type: 'PUT',
        headers:{'X-CSRF-Token': csrf-token};
        dataType: 'json',
        contentType: 'application/json',
        data:obj,
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

