
function valid()
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
	return true;
}
