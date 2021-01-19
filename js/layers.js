addLayer("c", {
    layer: "c", // This is assigned automatically, both to the layer and all upgrades, etc. Shown here so you know about it
    name: "coins", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(20),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#E2BA36",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "coins", // Name of prestige currency
    baseResource: "fame", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    row: 0, // Row the layer is in on the tree (0 is the first row)
    buyables: {
        rows: 7,
        cols: 5,
        11: {
            title: "Copper", // Optional, displayed at the top in a larger font
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (getBuyableAmount(this.layer, this.id).lt(51)) return new Decimal(10)
                if (x.gte(51)) x = x.pow(2).div(25)
                let cost = Decimal.pow(2, x.pow(1.5))
                return cost.floor()
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                if (x.gte(51)) eff.first = Decimal.pow(25, x.pow(1.1))
                else eff.first = Decimal.add(1)
            
                if (x.gte(51)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
                return eff;
            },
            display(x=player[this.layer].buyables[this.id]) { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                if (x.gte(0)) return "Cost: " + format(data.cost) + " coins\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Adds + " + format(data.effect.first) + " copper; 2 copper can be Crafted "
            },
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() {
                return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
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
        12: {
            title: "Tin",
            color: "#6B6B63",
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (getBuyableAmount(this.layer, this.id).lt(51)) return new Decimal(20)
                if (x.gte(51)) x = x.pow(2).div(25)
                let cost = Decimal.pow(2, x.pow(1.5))
                    return cost.floor()
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                if (x.gte(51)) eff.first = Decimal.pow(25, x.pow(1.1))
                else eff.first = Decimal.add(1)
            
                if (x.gte(51)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
                return eff;
            },
            display(x=player[this.layer].buyables[this.id]) { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                if (x.gte(0)) return "Cost: " + format(data.cost) + " coins\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Adds + " + format(data.effect.first) + " tin; 2 tin can be Crafted "
            },
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() {
                return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
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
})
addLayer("cu", {
    layer: "cu", // This is assigned automatically, both to the layer and all upgrades, etc. Shown here so you know about it
    name: "copper", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Cu", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#3C7E82",
    layerShown() {return getBuyableAmount("c",11).gte(2) || player[this.layer].unlocked}, // Can be a function that takes requirement increases into account
    update() {
        if (getBuyableAmount("c",11).gte(2))
        player[this.layer].unlocked = true
    },
    resource: "saved swords", // Name of prestige currency
    baseResource: "coins", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    exponent: 0.5, // Prestige currency exponent
    row: 1, // Row the layer is in on the tree (0 is the first row)
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            title: "Copper Sword", // Optional, displayed at the top in a larger font
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (getBuyableAmount(this.layer, this.id).lt(26)) return new Decimal(2)
                if (x.gte(51)) x = x.pow(2).div(25)
                let cost = Decimal.pow(2, x.pow(1.5))
                return cost.floor()
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                if (x.gte(51)) eff.first = Decimal.pow(25, x.pow(1.1))
                else eff.first = Decimal.add(1)
            
                if (x.gte(51)) eff.second = x.pow(0.8)
                else eff.second = x.times(-1).pow(0.8).times(-1)
                return eff;
            },
            display(x=player[this.layer].buyables[this.id]) { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                if (x.gte(0)) return "Cost: " + format(data.cost) + " copper\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Adds + " + format(data.effect.first) + " Copper Sword; Sell for coins or Improve to increase value" + "\n\
                Value: " + new Decimal(100) + " coins"
            },
            unlocked() { return player[this.layer].unlocked }, 
            // Returns the cost, in this case the cost is always 2.
            // Other example of costs:
            //     new Decimal(1).mul(Decimal.pow(10, getBuyableAmount(this.layer, this.id))) [1, 10, 100...]
            //     new Decimal(2).mul(getBuyableAmount(this.layer, this.id).add(1))           [2, 4, 6, 8...]
            canAfford() {
                return getBuyableAmount("c",11).gte(this.cost());
            },
            // Checks the other buyable to see if it is larger than the cost.
            buy() {
                setBuyableAmount("c",11, getBuyableAmount("c",11).sub(this.cost()));
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            },
            // Subtracts the cost from the other buyable.
            // Then adds 1 to this buyable.
            buyMax() {}, // You'll have to handle this yourself if you want
            style: {'height':'222px'},
            sellOne() {
                let amount = getBuyableAmount(this.layer, this.id)
                if (amount.lte(0)) return // Only sell one if there is at least one
                setBuyableAmount(this.layer, this.id, amount.sub(1))
                player.c.points = player.c.points.add(new Decimal(100))
            },
        },
    },
})
addLayer("m", {
    layer: "m", // This is assigned automatically, both to the layer and all upgrades, etc. Shown here so you know about it
    name: "Museum", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        buyables: {}, // You don't actually have to initialize this one
        beep: false,
    }},
    color: "#4BDC13",
    layerShown() {
        return true
    },
    update() {
        if (getBuyableAmount("cu",11).gte(1))
        player[this.layer].unlocked = true
    },
    tooltipLocked() {
        return "Craft one sword"
    },
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "donations", // Name of prestige currency
    baseResource: "crafted swords", // Name of resource prestige is based on
    baseAmount() {return getBuyableAmount("cu",11)}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    base: 5, // Only needed for static layers, base of the formula (b^(x^exp))
    roundUpCost: false, // True if the cost needs to be rounded up (use when baseResource is static?)

    // For normal layers, gain beyond [softcap] points is put to the [softcapPower]th power
    softcap: new Decimal(1e100), 
    softcapPower: new Decimal(0.5), 
    canBuyMax() {}, // Only needed for static layers with buy max
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade(this.layer, 166)) mult = mult.times(2) // These upgrades don't exist
        if (hasUpgrade(this.layer, 120)) mult = mult.times(upgradeEffect(this.layer, 120))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    })
