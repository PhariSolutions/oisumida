/**
 * Mongoose model of a post:
 *
 */

var postSchema = MODULES.mongoose.Schema({
    text: String,
    image: { type: Buffer, default: null },
    location: {
        'type': { type: String, enum: "Point", default: "Point" },
        coordinates: { type: [Number],   default: [0,0] }
    },
    lifetime: { type: Number, min: 1, max: 86400 }
});
postSchema.index({ location : "2dsphere" });

MODULES.mongoose.model('Post', postSchema);
