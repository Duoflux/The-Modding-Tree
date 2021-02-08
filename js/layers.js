addLayer("v", {
    layer: "v", // This is assigned automatically, both to the layer and all upgrades, etc. Shown here so you know about it
    name: "vendor", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "V", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(2),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#E2BA36",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "coins", // Name of prestige currency
    baseResource: "fame", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        let preup4 = new Decimal(0.5)
        if (hasUpgrade("m", 14)) preup4 = preup4.add(upgradeEffect("m", 14))
        return preup4;
    }, // Prestige currency exponent
    row: 0, // Row the layer is in on the tree (0 is the first row)
    buyables: {
        rows: 1,
        cols: 2,
        11: {
            title: "Copper", // Optional, displayed at the top in a larger font
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                getBuyableAmount(this.layer, this.id);
                return new Decimal(1)
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                eff.first = Decimal.add(1)
            
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
                getBuyableAmount(this.layer, this.id);
                return new Decimal(8)
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                eff.first = Decimal.add(1)
            
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
addLayer("f", {
    layer: "f", // This is assigned automatically, both to the layer and all upgrades, etc. Shown here so you know about it
    name: "Forge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        bestBuyable: new Decimal(0),
    }},
    color: "#3C7E82",
    layerShown() {return getBuyableAmount("v",11).gte(2) || player[this.layer].unlocked}, // Can be a function that takes requirement increases into account
    update() {
        if (getBuyableAmount("v",11).gte(2))
        player[this.layer].unlocked = true
    },
    resource: "crafted swords", // Name of prestige currency
    baseResource: "coins", // Name of resource prestige is based on
    baseAmount() {return new Decimal(player.v.points)}, // Get the current amount of baseResource
    exponent: 0.5, // Prestige currency exponent
    row: 1, // Row the layer is in on the tree (0 is the first row)
    buyables: {
        rows: 1,
        cols: 2,
        11: {
            title: "Copper Sword", // Optional, displayed at the top in a larger font
            cost() {return new Decimal(2)}, // cost for buying xth buyable, can be an object if there are multiple currencies
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
                let eff = Decimal.add(1)
                return eff;
            },
            display(x=player[this.layer].buyables[this.id]) { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                if (new Decimal(x).gte(0)) return "Cost: " + format(data.cost) + " copper\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Adds + " + format(data.effect) + " Copper Sword; Sell for coins or Improve to increase value" + "\n\
                Value: " + new Decimal(4) + " coins"
            },
            unlocked() { return player[this.layer].unlocked }, 
            // Returns the cost, in this case the cost is always 2.
            // Other example of costs:
            //     new Decimal(1).mul(Decimal.pow(10, getBuyableAmount(this.layer, this.id))) [1, 10, 100...]
            //     new Decimal(2).mul(getBuyableAmount(this.layer, this.id).add(1))           [2, 4, 6, 8...]
            canAfford() {
                return getBuyableAmount("v",11).gte(this.cost());
            },
            // Checks the other buyable to see if it is larger than the cost.
            buy() {
                setBuyableAmount("v",11, getBuyableAmount("v",11).sub(this.cost()))
                setBuyableAmount(this.layer, this.id, new Decimal(getBuyableAmount(this.layer, this.id)).add(1))
                player[this.layer].points = player[this.layer].points.add(1)
                player[this.layer].best = player[this.layer].best.add(1)
                player[this.layer].total = player[this.layer].total.add(1)
                let bestCopper = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id).gte(bestCopper))
                    bestCopper = getBuyableAmount(this.layer, this.id)
            },
            // Subtracts the cost from the other buyable.
            // Then adds 1 to this buyable.
            buyMax() {}, // You'll have to handle this yourself if you want
            sellOne() {
                let amount = getBuyableAmount(this.layer, this.id)
                if (amount.lte(0)) return // Only sell one if there is at least one
                setBuyableAmount(this.layer, this.id, amount.sub(1))
                player.v.points = player.v.points.add(new Decimal(4))
                player[this.layer].points = player[this.layer].points.sub(1)
                player[this.layer].best = player[this.layer].best.max(player[this.layer].points)
            },
        },
        12: {
            title: "Tin Sword",
            cost(x=player[this.layer].buyables[this.id]) {
                getBuyableAmount(this.layer, this.id);
                return new Decimal(2)
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
                let eff = Decimal.add(1)
                return eff;
            },
            display(x=player[this.layer].buyables[this.id]) { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                if (new Decimal(x).gte(0)) return "Cost: " + format(data.cost) + " tin\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Adds + " + format(data.effect) + " Tin Sword; Sell for coins or Improve to increase value" + "\n\
                Value: " + new Decimal(20) + " coins"
            },
            unlocked() { return player[this.layer].unlocked },
            canAfford() {
                return getBuyableAmount("v",12).gte(this.cost());
            },
            buy() {
                setBuyableAmount("v",12, getBuyableAmount("v",12).sub(this.cost()))
                setBuyableAmount(this.layer, this.id, new Decimal(getBuyableAmount(this.layer, this.id)).add(1))
                player[this.layer].points = player[this.layer].points.add(1)
                player[this.layer].best = player[this.layer].best.add(1)
                player[this.layer].total = player[this.layer].total.add(1)
                let bestTin = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id).gte(bestTin))
                    bestTin = getBuyableAmount(this.layer, this.id)
            },
            sellOne() {
                let amount = getBuyableAmount(this.layer, this.id)
                if (amount.lte(0)) return // Only sell one if there is at least one
                setBuyableAmount(this.layer, this.id, amount.sub(1))
                player.v.points = player.v.points.add(new Decimal(20))
                player[this.layer].points = player[this.layer].points.sub(1)
                player[this.layer].best = player[this.layer].best.max(player[this.layer].points)
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
    }},
    color: "#C2C0BB",
    effectDescription() {return "Each donation increases fame gain by X per second. Pester the dev to find out how to display X."},
    layerShown() {return true},
    update() {
        if (new Decimal(getBuyableAmount("f",11)).gte(1))
        if (new Decimal(getBuyableAmount("f",12)).gte(1))
        player[this.layer].unlocked = true
    },
    onPrestige() {
        player.f.buyables[11]=0;
        player.f.buyables[12]=0;
    },
    tooltipLocked() {return "Craft one sword"},
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "donations", // Name of prestige currency
    baseResource: "crafted swords", // Name of resource prestige is based on
    baseAmount() {return new Decimal(getBuyableAmount("f",11)).plus(getBuyableAmount("f",12))}, // Get the current amount of baseResource
    getCost() {return getResetGain(this.layer);},
    doReset(layer) {
        // doReset is called whenever a layer of higher or equal row resets.
        // layer is the id of the layer that reset.
        if (layer == this.layer) {
            // Only when this layer is reset.
            player.f.points = player.f.points.sub(tmp[this.layer].getCost);
            setBuyableAmount("f",11,0);
            setBuyableAmount("f",12,0); // Set the number of buyables to 0.
        }
    },
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent

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
    gainExp() {return new Decimal(1)}, // Calculate the exponent on main currency from bonuses
    row: 1, // Row the layer is in on the tree (0 is the first row)
    milestones: {
        0: {requirementDescription: "1 donation",
            done() {return player[this.layer].best.gte(1)}, // Used to determine when to give the milestone
            effectDescription: "The museum can fill a weapon rack now. Unlocks fame upgrades.",
        },
    },
    upgrades: {
        rows: 1,
        cols: 4,
        11: {
            title: "Weapon Rack",
            description: "Add 1 fame per second to base fame gain.",
            cost: new Decimal(2),
            unlocked() {return hasMilestone(this.layer, 0)}, // The upgrade is only visible when this is true
            effect: 1
        },
        12: {
            title: "More Racks",
            description: "Double base fame gain.",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade(this.layer, 11)},
            effect: 2
        },
        13: {
            title: "Word-of-Mouth Advertising",
            description: "Fame gain increases based on fame.",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade(this.layer, 12)},
            effect() {
                let wom = player.points.add(1).max(1)
                wom = Decimal.log10(wom).pow(1.2).add(4)
                return wom
            },
            effectDisplay(){
                return format(upgradeEffect("m", 13)) + "x"
            }
        },
        14: {
            title: "Entrance Fees",
            description: "Get more coins from fame reset.",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade(this.layer, 13)},
            effect: 0.01,
            effectDisplay(){
            return "+" + format(0.01) + "exponent to fame reset."
            },
        },
    },
})
addLayer("i", {
    layer: "i", // This is assigned automatically, both to the layer and all upgrades, etc. Shown here so you know about it
    name: "Factory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#B25029",
    layerShown() {return (player.f.best.gte(50)||player[this.layer].unlocked)},
    update() {player[this.layer].unlocked = player[this.layer].unlocked || player.f.best.gte(50)},
    automation(diff) {
        if (tmp.v.buyables[11].canAfford&&hasMilestone("i", 0))
        {layers.v.buyables[11].buy()}
    },
    tooltipLocked() {return "Craft 50 swords across all resets. CURRENTLY UNDER CONSTRUCTION, ALMOST NOTHING INSIDE YET"},
    requires: new Decimal(10),
    resource: "Industrium",
    baseResource: "coins",
    baseAmount() {return new Decimal(player.v.points)},
    getCost() {return getResetGain(this.layer);},
    type: "normal",
    exponent: 0.5,
    softcap: new Decimal(1e100),
    softcapPower: new Decimal(0.5),
    canBuyMax() {},
    gainExp() {return new Decimal(1)},
    row: 1,
    milestones: {
        0: {requirementDescription: "5 Industrium",
        done() {return player[this.layer].best.gte(5)},
        effectDescription: "Automates buying copper",
        },
    },
})