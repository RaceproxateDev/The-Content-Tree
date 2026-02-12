let modInfo = {
	name: "The Content Tree",
	author: "RaceDev",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "QoL improvements",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.
		<br><h3>v0.1</h3><br>
		- Added some QoL features (like hotkeys)
		- fixed achievements not displaying when not completed
		`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade("bp", 11)) gain = gain.add(1)
	if (hasUpgrade("bp", 12)) gain = gain.add(0.5)
	if (hasUpgrade("bp", 13)) gain = gain.times(2)
	if (hasUpgrade("bp", 14)) gain = gain.times(upgradeEffect("bp", 14))
	if (hasUpgrade("bp", 17)) gain = gain.times(3)
	if (hasUpgrade("bp", 18)) gain = gain.times(upgradeEffect("bp", 18))
	if (hasUpgrade("bp", 19)) gain = gain.times(4)
	if (hasUpgrade("bp", 21)) gain = gain.times(upgradeEffect("bp", 21))
	if (hasUpgrade("bp", 22)) gain = gain.times(10)
	if (hasUpgrade("br", 11)) gain = gain.times(3)
	if (hasUpgrade("br", 13)) gain = gain.times(5)
	if (hasUpgrade("br", 14)) gain = gain.times(upgradeEffect("br", 14))
	if (hasUpgrade("br", 16)) gain = gain.times(6)
	if (hasMilestone("a", 0)) gain = gain.times(3)
	if (hasMilestone("a", 3)) gain = gain.pow(1.01)
	if (hasMilestone("a", 5)) gain = gain.pow(1.1)
	if (hasMilestone("a", 6)) gain = gain.pow(1.1)
	if (inChallenge("a", 11)) gain = gain.div(6)
	if (hasChallenge("a", 11)) gain = gain.times(10)
	
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"<br> <h3> Endgame: 1 Ultra Point </h3>"
]

// Determines when the game "ends"
function isEndgame() {
	return player.up.points.gte(1)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
