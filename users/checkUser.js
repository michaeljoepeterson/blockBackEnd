let checkUser = function(req,res,next){
	const requestFields = Object.keys(req.body).length;
	if (requestFields > 2){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Extra Field"
		});
	}
	const requiredFields = ['username','password'];
	const missingField = requiredFields.find(field => !(field in req.body));
	if(missingField){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Missing Field",
			location:missingField
		});
	}
	const stringFields = ['username', 'password'];
	const nonStringField = stringFields.find(field => field in req.body && typeof req.body[field] !== 'string');

	if (nonStringField){
		return res.status(422).json({
	      code: 422,
	      reason: 'ValidationError',
	      message: 'Incorrect field type: expected string',
	      location: nonStringField
    	});
	}
	const explicityTrimmedFields = ['username', 'password'];
  	const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  	);

  	if (nonTrimmedField) {
	    return res.status(422).json({
	      code: 422,
	      reason: 'ValidationError',
	      message: 'Cannot start or end with whitespace',
	      location: nonTrimmedField
	    });
  }
  const sizedFields = {
    username: {
      min: 1,
      max: 50
    },
    password: {
      min: 10,
      max: 72
    }
  };
   const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  next();
}

module.exports = {checkUser};