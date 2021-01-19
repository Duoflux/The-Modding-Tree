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
	num: "0.2",
	name: "The museum! Let your mighty deeds of smithing be forever immortalized! (Or just toss all your junk, same thing)",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- The beginning (of my frustration.)<br>
	<h3>v0.0.1</h3><br>
		- You can perform the most basic progressions now. I guess technically that's a game?
	<h3>v.0.2</h3><br>
		- Added the museum. Now you can get more famous by dumping swords on some hapless shmuck. (Eventually)`


let winText = `You are truly both a blacksmith and a badass. You have reached the end of your journey for now...`

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

	let gain = new Decimal(0)
	if(player[prestigeFame] == true){
		let gain = new Decimal(0.1)
	return gain
	}
}

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