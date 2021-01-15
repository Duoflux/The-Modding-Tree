addLayer("c", {
    name: "coin", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#E8CC42",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "material", // Name of prestige currency
    baseResource: "coins", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    buyables: {
        rows: 7,
        cols: 5,
        11: {
            title: "Copper", // Optional, displayed at the top in a larger font
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (x.gte(25)) x = x.pow(2).div(25)
                let cost = Decimal.pow(2, x.pow(1.5))
                return cost.floor()
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                if (x.gte(0)) eff.first = Decimal(0)
                else eff.first = Decimal(0)
            
                if (x.gte(0)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " coins\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Adds + " + format(data.effect.first) + " Copper " + format(data.effect.second)
            },
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() {
                return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
            },
            buyMax() {}, // You'll have to handle this yourself if you want
            style: {'height':'222px'},
            sellOne() {
                let amount = getBuyableAmount(this.layer, this.id)
                if (amount.lte(0)) return // Only sell one if there is at least one
                setBuyableAmount(this.layer, this.id, amount.sub(1))
                player[this.layer].points = player[this.layer].points.add(this.cost)
            },
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for coins", onPress(c){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
