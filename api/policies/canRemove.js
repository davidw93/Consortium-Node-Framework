/*
* canRemove
*
* @module		:: Policy
* @descritpion	:: Policy to ensure that only certain users can remove
*				   Users
*/

module.exports = function(req, res, next) {

	var access_level = req.session.user.access_level;
	
	// Gives user a 403 - Forbidden Access Page
	if(err){
		return res.redirect('/403');
	}
	// If users access
	else if(access_level == 'board'){
		return next();
	}
}