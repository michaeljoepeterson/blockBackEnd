const mongoose = require('mongoose');

const mapSchema = mongoose.Schema({
	mapName:{type:String, required:true},
	owner:{type:mongoose.Schema.Types.ObjectId, ref:'User',unique:false,required:[false,"no character found"]},
	gridData:{type:Array},
	adjacentMaps:{type:Object}
});

mapSchema.methods.serialize = function(){
	return{
		mapName:this.mapName,
		id:this._id,
		gridData:this.gridData,
		adjacentMaps:this.adjacentMaps || {}
	}
};

const GameMap = mongoose.model("GameMap",mapSchema);

module.exports = {GameMap};