const mongoose = require('mongoose');

const gameObjectSchema = mongoose.Schema({
	gameObjectName:{type:String, required:true},
	owner:{type:mongoose.Schema.Types.ObjectId, ref:'User',unique:false,required:[false,"no character found"]},
	gridData:{type:Array},
	animation:{type:Array}
});

gameObjectSchema.methods.serialize = function(){
	return{
		gameObjectName:this.gameObjectName,
		id:this._id,
		gridData:this.gridData,
		animation:this.animation || []
	}
};

const GameObject = mongoose.model("GameObject",gameObjectSchema);

module.exports = {GameObject};