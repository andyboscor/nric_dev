
function valid(user_object)
{
	var user=document.login.usermail.value;
	var user=user.trim();
	var pass=document.login.password.value;
	
	if(user == '')
	{
		document.getElementById('error').innerHTML="Please Enter Username";
		return false;
	}
	if(pass == '')
	{
		document.getElementById('error').innerHTML="Please Enter Password";
		return false;
	}
	// json has sessID if login sucessful
	if(user_object.hasOwnProperty('sessid')){
		return true;
	}

	return false;
}
