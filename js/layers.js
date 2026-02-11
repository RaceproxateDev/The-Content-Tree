addLayer("ach", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#fff700",                       // The color for this layer, which affects many elements.
    resource: "???",            // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {             
        let exp = new Decimal(1)                // Returns the exponent to your gain of the prestige resource.

        return exp
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    tabFormat: {
        "Achievements":
        {
            content: ["achievements"],
        }
    },

    achievements: {
        11: {
            name: "small",
            done() { return player.points.gte(10) },
            tooltip: "Reach 10 points.",
            unlocked() { return true }, 
        },

        12: {
            name: "3 digits",
            done() { return player.points.gte(100) && hasAchievement("ach", 11) },
            tooltip: "Reach 100 points.",
            unlocked() { return hasAchievement("ach", 11) },
        },

        13: {
            name: "Reset?",
            done() { return player.bp.points.gte(1) && hasAchievement("ach", 12) },
            tooltip: "Reach 1 basic prestige point.",
            unlocked() { return hasAchievement("ach", 12) },
        },

        14: {
            name: "Points now are a bit useful?",
            done() { return hasUpgrade("bp", 14) && hasAchievement("ach", 13) },
            tooltip: "Buy basic prestige upgrade 4",
            unlocked() { return hasAchievement("ach", 13) },
        },

        15: {
            name: "Very, very Useful",
            done() { return hasUpgrade("bp", 16) && hasAchievement("ach", 14) },
            tooltip: "Buy basic prestige upgrade 6",
            unlocked() { return hasAchievement("ach", 14) },
        },

        16: {
            name: "Closer...",
            done() { return player.points.gte(1000) && hasAchievement("ach", 15) },
            tooltip: "Get 1000 Points",
            unlocked() { return hasAchievement("ach", 15) }
        },

        17: {
            name: "Upgraded Points",
            done() { return hasUpgrade("bp", 18) && hasAchievement("ach", 16) },
            tooltip: "Buy Basic Prestige Upgrade 8",
            unlocked() { return hasAchievement("ach", 16) }
        },

        18: {
            name: "New layer!",
            done() { return hasMilestone("pr", 0) },
            tooltip: "Unlock Basic Rebirth",
            unlocked() { return hasAchievement("ach", 17) }
        },

        19: {
            name: "Two of them",
            done() { return player.pr.points.gte(2) },
            tooltip: "Get 2 progression points",
            unlocked() { return hasAchievement("ach", 18) }
        },

        21: {
            name: "is it big?",
            done() { return player.points.gte(1e9) },
            tooltip: "get 1e9 points",
            unlocked() { return hasAchievement("ach", 19) }
        },

        22: {
            name: "Ascensions?",
            done() { return player.pr.points.gte(3) },
            tooltip: "get 3 progression points",
            unlocked() { return hasAchievement("ach", 21) }
        },

        23: {
            name: "Getting there",
            done() { return player.a.points.gte(5) },
            tooltip: "Get 5 Ascension points",
            unlocked() { return hasAchievement("ach", 22) }
        },

        24: {
            name: "Ultra now",
            done() { return player.up.points.gte(1) },
            tooltip: "Get 1 Ultra Point",
            unlocked() { return hasAchievement("ach", 23) }
        }
    }
})

addLayer("pr", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#9500ff",      
    resource: "progression points",            // The name of this layer's main prestige resource.
    row: 999999,
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e5),              // The amount of the base needed to  gain 1 of the prestige currency.
    type: "static",
    exponent: 5,

    milestones: {
        0: {
            requirementDescription: "1 progression point",
            effectDescription: "Unlock basic Rebirth",
            done() { return player[this.layer].points.gte(1) },
        },

        1: {
            requirementDescription: "3 progression points",
            effectDescription: "Unlock Ascensions",
            done() { return player[this.layer].points.gte(3) },
            unlocked() { return hasMilestone("pr", 0) }
        },

        2: {
            requirementDescription: "4 progression points",
            effectDescription: "Unlock Ultra Points",
            done() { return player[this.layer].points.gte(4) },
            unlocked() { return hasMilestone("pr", 1) }
        }
    }
})                            

addLayer("bp", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#04b4ff",                       // The color for this layer, which affects many elements.
    resource: "basic prestige points",            // The name of this layer's main prestige resource.
    row: 0,   
    symbol: "BP",                              

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.8,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let mult = new Decimal(1) 
        if (hasUpgrade("bp", 15)) mult = mult.times(1.5)
        if (hasUpgrade("bp", 16)) mult = mult.times(upgradeEffect("bp", 16))
        if (hasUpgrade("bp", 19)) mult = mult.times(3)
        if (hasUpgrade("br", 12)) mult = mult.times(4)
        if (hasMilestone("a", 0)) mult = mult.times(3)
        if (hasMilestone("a", 6)) mult = mult.times(8)
        return mult
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },           // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11: {
            title: "Maybe Useless",
            description: "Gain 1 extra point per second.",
            cost: new Decimal(1),
        },

        12: {
            title: "Still as Useless as the other one",
            description: "+0.5 points per second",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("bp", 11) },
        },

        13: {
            title: "an useful one",
            description: "2x Points",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade("bp", 12) },
        },

        14: {
            title: "Synergy I",
            description: "Points boost themselves",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("bp", 13) },
            
            effect() {
                return player.points.add(1).pow(0.1)
            },

            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

        15: {
            title: "Boosting Basic Points",
            description: "1.5x basic prestige gain",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("bp", 14) },
        },

        16: {
            title: "Synergy II",
            description: "Points boost basic prestige points",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade("bp", 15) },

            row: 0,
            column: 1,
            
            effect() {
                return player.points.add(1).pow(0.05)
            },

            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

        17: {
            title: "Better Points",
            description: "Boost your points by 3x",
            cost: new Decimal(35),
            unlocked() { return hasUpgrade("bp", 16) },
        },

        18: {
            title: "Better Synergy I",
            description: "Points boost themselves better",
            cost: new Decimal(50),
            unlocked() { return hasUpgrade("bp", 17) },

            effect() {
                return player.points.add(1).pow(0.2)
            },

            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },

        19: {
            title: "Double",
            description: "3x Basic Prestige gain and 4x Point gain",
            cost: new Decimal(75),
            unlocked() { return hasUpgrade("bp", 18) },
        },

        21: {
            title: "Synergy III",
            description: "Basic Prestige boost Points gain",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade("bp", 19) },

            effect() {
                return player[this.layer].points.add(1).pow(0.25)
            },

            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },

        22: {
            title: "Final boost",
            description: "10x Point gain",
            cost: new Decimal(20000),
            unlocked() { return hasUpgrade("bp", 21) }
        }
    },

    autoUpgrade() { return hasMilestone("a", 1) },

    passiveGeneration() {
        let p = new Decimal(0)
        if (hasMilestone("a", 2)) p = p.add(1)
        return p
    }
})

addLayer("br", {
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},

    color: "#ff00fb",
    resource: "Basic Rebirth Points",
    row: 1,
    symbol: "BR",

    branches: ["bp"],

    baseResource: "basic prestige points",
    baseAmount() { return player.bp.points },
    
    requires: new Decimal(1000000),
    
    type: "normal",
    exponent: 0.8,

    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade("br", 15)) mult = mult.times(5)
        if (hasMilestone("a", 0)) mult = mult.times(3)
        if (hasMilestone("a", 2)) mult = mult.times(10)
        if (hasMilestone("a", 3)) mult = mult.times(3)
        if (hasMilestone("a", 4)) mult = mult.pow(1.1)
        if (hasUpgrade("br", 17)) mult = mult.times(5)
        if (hasUpgrade("br", 18)) mult = mult.times(10)
        if (hasMilestone("a", 5)) mult = mult.pow(1.1)
        if (inChallenge("a", 12)) mult = mult.times(0)
        if (hasChallenge("a", 12)) mult = mult.pow(1.05)
        return mult
    },

    gainExp() {
        let exp = new Decimal(1)

        return exp
    },

    unlocked() { return hasMilestone("pr", 0) },
    layerShown() { return hasMilestone("pr", 0) || player.br.unlocked },

    upgrades: {
        11: {
            title: "Rebirth begginer pack!",
            description: "3x Points",
            cost: new Decimal(1)
        },

        12: {
            title: "Super Basic Prestige boost",
            description: "4x Basic Prestige gain",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("br", 11) }
        },

        13: {
            title: "More Points...",
            description: "5x Points",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("br", 12) }
        },

        14: {
            title: "Synergy IV",
            description: "Basic Rebirth boost Point gain",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("br", 13) },

            effect() {
                return player[this.layer].points.add(1).pow(0.35)
            },

            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },

        15: {
            title: "Great boost",
            description: "5x Rebirth Points",
            cost: new Decimal(1500),
            unlocked() { return hasUpgrade("br", 14) }
        },

        16: {
            title: "Mega Boost on Points",
            description: "Boost your point gain by 6x",
            cost: new Decimal(5e5),
            unlocked() { return hasUpgrade("br", 15) }
        },

        17: {
            title: "Still more?",
            description: "5x Basic Rebirth points",
            cost: new Decimal(1e15),
            unlocked() { return hasMilestone("a", 4) }
        },

        18: {
            title: "More Basic Rebirth",
            description: "10x Basic Rebirth points",
            cost: new Decimal(1e18),
            unlocked() { return hasUpgrade("br", 17) },
        },

        19: {
            title: "6th Ascension",
            description: "15x Basic Rebirth points",
            cost: new Decimal(5e20),
            unlocked() { return hasUpgrade("br", 18) }
        }
    },

    passiveGeneration() {
        let p = new Decimal(0)
        if (hasMilestone("a", 5)) p = p.add(1)
        return p
    }
})

addLayer("a", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#f6ff00",                       // The color for this layer, which affects many elements.
    resource: "ascension points",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    branches: ["br"],

    baseResource: "Basic Rebirth points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.br.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e6),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 2.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return hasMilestone("pr", 1) || player.a.unlocked },          // Returns a bool for if this layer's node should be visible in the tree.

    milestones: {
        0: {
            requirementDescription: "1 Ascension Point",
            effectDescription: "3x Point gain, Basic Prestige and Basic Rebirth",
            done() { return player[this.layer].points.gte(1) }
        },

        1: {
            requirementDescription: "2 Ascension Points",
            effectDescription: "Automate Prestige Upgrades",
            done() { return player[this.layer].points.gte(2) }
        },

        2: {
            requirementDescription: "3 Ascension Points",
            effectDescription: "10x Basic Rebirth Points and passively gain 100% of your Basic Prestige points per second",
            done() { return player[this.layer].points.gte(3) }
        },

        3: {
            requirementDescription: "4 Ascension Points",
            effectDescription: "^1.01 Points, 3x Basic Rebirth Points",
            done() { return player[this.layer].points.gte(4) }
        },

        4: {
            requirementDescription: "5 Ascension Points",
            effectDescription: "^1.1 Basic Rebirth points and unlock more Basic Rebirth upgrades",
            done() { return player[this.layer].points.gte(5) },
            unlocked() { return hasMilestone("a", 3) }
        },

        5: {
            requirementDescription: "6 Ascension Points",
            effectDescription: "^1.1 Basic Rebirth Points and Points, gain passively 100% of Basic Rebirth Points per second",
            done() { return player[this.layer].points.gte(6) },
            unlocked() { return hasMilestone("a", 4) }
        },

        6: {
            requirementDescription: "7 Ascension Points",
            effectDescription: "^1.1 Points (again) and 8x Basic Prestige Points",
            done() { return player[this.layer].points.gte(7)},
            unlocked() { return hasMilestone("a", 5) }
        },

        7: {
            requirementDescription: "9 Ascension Points",
            effectDescription: "Unlock Challenges Tab",
            done() { return player[this.layer].points.gte(9) },
            unlocked() { return hasMilestone("a", 6) }
        }
    },

    tabFormat: {
        "Milestones": {
            content: ["main-display","prestige-button","blank", 
            ["display-text", function() {
                return "You have " + format(player.br.points) + " Basic Rebirth Points"
            } ], "blank", "milestones"]
        },

        "Challenges": {
            content: ["challenges"],
            unlocked() { return hasMilestone("a", 7) }
        }
    },

    challenges: {
        11: {
            name: "Bad Points",
            challengeDescription: "Your points are divied by 6",
            goalDescription: "Reach 1e80 Points",
            rewardDescription: "Multiply your points by 10",
            completionLimit: 1,

            canComplete() { return player.points.gte(1e80) }
        },

        12: {
            name: "No Basic Rebirth",
            challengeDescription: "You cant gain any Basic Rebirth points",
            goalDescription: "Get 1e25 Points",
            rewardDescription: "^1.05 Basic Rebirth points",
            completionLimit: 1,

            canComplete() { return player.points.gte(1e25) },
            unlocked() { return hasChallenge("a", 11) }
        }
    },

    unlocked() { return hasMilestone("pr", 1) },

})

addLayer("up", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#ffbb00",                       // The color for this layer, which affects many elements.
    resource: "Ultra points",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).
    symbol: "UP",

    branches: ["br"],

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e100),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    unlocked() { return hasMilestone("pr", 2) },
    layerShown() { return hasMilestone("pr", 2) || player.up.unlocked },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
})
