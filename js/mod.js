let modInfo = {
	name: "Badass Blacksmith Quest: The Tree",
	id: "TastyBBQTree",
	author: "Duoflux",
	pointsName: "fame",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3.1",
	name: "The Bronze Age (FACTORY RECALIBRATIONS REQUIRED)",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- The beginning (of my frustration.)<br>
	<h3>v0.0.1</h3><br>
		- You can perform the most basic progressions now. I guess technically that's a game?
	<h3>v0.2</h3><br>
		- Added the museum. Now you can get more famous by dumping swords on some hapless shmuck.
	<h3>v0.2.1</h3><br>
		- Adding upgrades to the museum. Now you can get EVEN MORE famous!
	<h3>v0.3</h3><br>
		- Getting tired of clicking to make swords? Just build a factory and automate them!
	<h3>v0.3.1</h3><br>
		- Oops, someone tried to shove copper and tin in the same factory port. Bronze is good, but now the factory needs to be recalibrated.`

let winText = `You are truly both a blacksmith and a badass. You have reached the end of your journey for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){ 
	let can = false
	if (player.m.points.gte(1)) can = true
	if (hasUpgrade("m", 11)) can = true
	return can
} // The function "canGenPoints" is turned off until you make your first donation or have your first upgrade.

// Calculate points/sec!
function getPointGen() {
	let gain = new Decimal(0.2)
	if(!canGenPoints()) gain = new Decimal(0)
	gain = gain.times(player.m.points)
	if (hasUpgrade("m", 11)) gain = gain.add(upgradeEffect("m", 11))
	if (hasUpgrade("m", 12)) gain = gain.times(upgradeEffect("m", 12))
	if (hasUpgrade("m", 13)) gain = gain.times(upgradeEffect("m", 13))
	return gain
} // Once canGenPoints turns on, fame gain is 0.2*current number of donations. It can be increased by upgrades.

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}