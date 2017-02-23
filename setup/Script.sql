use oisumida
db.posts.createIndex( { location : "2dsphere" } )
db.posts.insert({
	"text":"ola",
	"image": null,
	"location": {
			"coordinates": [1.0 , 0.0],
			"type": "Point"
	},
	"lifetime": 3600
})
