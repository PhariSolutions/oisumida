/**
 * Mongoose model of a post:
 *
 */
module.exports = function (mongoose) {
    var postSchema = mongoose.Schema({
        text: String,
        image: { type: String, default: null },
        location: {
            'type': { type: String, enum: "Point", default: "Point" },
            coordinates: { type: [Number], default: [0, 0] }
        },
        expire: {
            type: Date,
            index: { expires: 0 }
        }
    });
    postSchema.index({ location: "2dsphere" });
    return mongoose.model('Post', postSchema);
}