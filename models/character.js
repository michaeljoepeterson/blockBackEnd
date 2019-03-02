const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
	charName:{type:String, required:true},
	owner:{type:mongoose.Schema.Types.ObjectId, ref:'User',unique:false,required:[false,"no character found"]},
	gridData:{type:Array},
	animation:{type:Array}
});

characterSchema.serialize = function(){
	return{
		charName:this.charName,
		id:this._id,
		gridData:this.gridData,
		animation:this.animation || []
	}
};

const Character = mongoose.model("Character",characterSchema);

module.exports = {Character};