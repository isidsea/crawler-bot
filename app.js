console.log("Starting Monitor App")

var MessengerFactory = require("./lib/factory/messenger")
var InspectorFactory = require("./lib/factory/inspector")
var FinderFactory    = require("./lib/factory/finder")
var Database 	     = require("./lib/object/database")
var Monitor          = require("./lib/object/monitor")
var Firebase         = require("./lib/object/firebase")

let firebase = new Firebase()
firebase.init()
firebase = firebase.getFirebase()

let db     = firebase.database()
let reqRef = db.ref("requests/crawler_name")

reqRef.on("value", function(snapshot){
	crawlerName = snapshot.val()
	console.log(`Getting ${crawlerName} informations.`)

	finder_factory = new FinderFactory()
	finder         = finder_factory.getFinder(finder_factory.CRAWLER_META)
	finder.find(crawlerName, function(monitorObj){
		monitorObj.updateStatus()
	})
}, function(err){
	console.log(`Error: ${err.code}`)
})

console.log("Monitor App is listening to Firebase")