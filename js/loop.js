addLayer("l", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#555555",                       // The color for this layer, which affects many elements.
    resource: "loops",            // The name of this layer's main prestige resource.
    row: 1000000,                                 // The row this layer is on (0 is the first row).

    baseResource: "progression points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.pr.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(100),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.000001,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return player.pr.points.gte(100) || player.l.unlocked },          // Returns a bool for if this layer's node should be visible in the tree.
    unlocked() { return player.pr.points.gte(100) },

    upgrades: {
       
    },

    branches: ["pr"],

    infoboxes: {
        ResetInfo: {
            title: "Loops",
            body: "Resets EVERYTHING (including progression but not achievements)"
        }
    }

})