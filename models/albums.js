const mongoose = require("mongoose")
const Review = require("./review")

const albumSchema = new mongoose.Schema({
    name: {type: String, required: true},
    artist: {type: String, required: true},
    releaseYear: Number,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}]
})

albumSchema.post("findOneAndDelete", function() {
    Review.deleteMany({album: this._conditions._id})
        .then(deleteStatus => {
            console.log("Delete Status: " + deleteStatus)
        })
})

module.exports = mongoose.model("Album", albumSchema)
//