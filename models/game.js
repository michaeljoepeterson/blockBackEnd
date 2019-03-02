const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
	gameName:{type:String, required:true},
	owner:{type:mongoose.Schema.Types.ObjectId, ref:'User',unique:false,required:[false,"no character found"]},
	columns:{type:Number,required:true},
	rows:{type:Number,required:true},
	maps:[{type:mongoose.Schema.Types.ObjectId,ref:"GameMap",unique:false,required:[false,"No maps found"]}],
	characters:[{type:mongoose.Schema.Types.ObjectId,ref:"Character",unique:false,required:[false,"No Character found"]}],
	gameObjects[{type:mongoose.Schema.Types.ObjectId,ref:"GameObject",unique:false,required:[false,"No GameObjects found"]}]
});

gameSchema.methods.serialize = function(){
	return{
		gameName:this.gameName,
		id:this._id,
		columns:this.columns,
		rows:this.rows,
		maps:this.maps,
		characters:this.characters,
		gameObjects:this.gameObjects
	}
};

const GameMap = mongoose.model("GameMap",gameSchema);

module.exports = {GameMap};