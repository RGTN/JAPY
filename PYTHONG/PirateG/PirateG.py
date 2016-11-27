import pickle

def pirateSave():
    a=open(mainDB)


def start():
    fileSave = open(mainDB, a)
    lvlArmor = 1
    lvlRailgun = 1
    lvlCM = 1
    lvlMissile = 1
    lvlAmmo = 1
    pickle.dump(lvlArmor, mainDB)
    pickle.dump(lvlRailgun, pirateSave)
    pickle.dump(lvlCM, pirateSave)
    pickle.dump(lvlMissile, pirateSave)
    pickle.dump(lvlAmmo, pirateSave)
    print("""
Welcome to the Pirate Game! This is a turn-based strategy game.
In this game, you are a pirate. To play, you must first have a ship, which is provided to you when you first start.

    Beginner Ship Stats:
    Mk.I Modular Neutroium Armor
    >>>HP: 1000
    >>>Shield: 200
    Mk.I Railgun
    >>>DMG: 25
    >>>Reload: 1
    Mk.I Counter-Measures
    >>>Effective: Mk.I Missiles
    Mk.I Missiles (DMG: 50/Reload: 5)
    >>>DMG: 50
    >>>Reload: 5
    Level 1 Ammunition Storage
    >>>50 Railgun Shells
    >>>100 Counter-Measures
    >>>10 Missiles

Use upgrades to improve your ship. They can be found at the docks in cities. Cities can be docked with, but there is a risk that you will be arrested.
You cannot buy ships, but you may upgrade the one that you have.
To destroy enemies, simply use your weapons. You may equip up to as may weapons as you like, as long as your ship upgrades support them.
Each Turn you will have a choice of maneuvers to perform as well as a choice of weapons to fire. Each time you fire a weapon, there is a small chance that it will miss. If it hits, then it will do the exact damage specified to the enemy.
Once an enemy's health reaches 0, then they die. There is also a small chance that you will recieve the weapons that it carries, and you are guarenteed to recieve its cargo.
There is also a monetary system of gold, silver, and other resources. There is also krouns.
Krouns is a currency similar to US dollars. Krouns can be earned using the BankBot Live system.
To save at anytime, just type save, and all of your progress will be saved.
    """)



def shipStats(lvlArmor, lvlRailgun, lvlCM, lvlMissile, lvlAmmo):
    pickle.load
    if (lvlArmor == 1):
        currentArmor = "Mk.I Neutronium Armor"
        armHP = "1000"
        armRE = "200"
    elif (lvlArmor == 2):
        currentArmor = "Mk.II Neutronium Armor"
        armHP = "2500"
        armRE = "500"
    elif (lvlArmor == 3):
        currentArmor = "Mk.III Neutronium Armor"
        armHP == "5000"
        armRE == "1000"
    elif (lvlArmor == 4):
        currentArmor = "Mk.IV Neutronium Armor"
        armHP = "7500"
        armRE = "1500"
    elif (lvlArmor == 5):
        currentArmor = "Mk.V Neutronium Armor"
        armHP = "10000"
        armRE = "2000"
    elif (lvlArmor == "god"):
        currentArmor = "GOD Armor"
        armHP = "1000000"
        armRE = "1000000"
    else:
        currentArmor = "Armor level not found. :("
        armHP = "N/A"
        armRE = "N/A"

    if (lvlRailgun == 1):
        currentRailgun = "Mk.I Railgun"
    elif (lvlRailgun == 2):
        currentRailgun = "Mk.II Railgun"
        railDMG = "75"
        railRE = "1"
    elif (lvlRailgun == 3):
        currentRailgun = "Mk.III Railgun"
        railDMG = "100"
        railRE = "1"
    elif (lvlRailgun == 4):
        currentRailgun = "Mk.IV Railgun"
        railDMG = "75"
        railRE = "0.5"
    elif (lvlRailgun == 5):
        currentRailgun = "Mk.V Railgun"
        railDMG = "50"
        railRE = "0.25"
    elif (lvlRailgun == "god"):
        currentRailgun = "GOD Railgun"
        railDMG = "100000"
        railRE = "0.25"
    else:
        currentRailgun = "Railgun level not found"
        railDMG = "N/A"
        railRE = "N/A"

    if (lvlCM == 1):
        currentCM = "Mk.I Counter-Measures"
        cmEff = "Mk.I Missiles"
    elif (lvlCM == 2):
        currentCM = "Mk.II Counter-Measures"
        cmEff = "Mk.II Missiles"
    elif (lvlCM == 3):
        currentCM = "Mk.III Counter-Measures"
        cmEff = "Mk.III Missiles"
    elif (lvlCM == 4):
        currentCM = "Mk.IV Counter-Measures"
        cmEff = "Mk.IV Missiles"
    elif (lvlCM == 5):
        currentCM = "Mk.V Counter-Measures"
        cmEFf = "Mk.V Missiles"
    elif (lvlCM == "god"):
        currentCM = "GOD Counter-Measures"
        cmEff = "ALL Missiles"
    else:
        currentCM = "Counter-Measures level not found. :("
        cmEff = "N/A"

    if (lvlMissile == 1):
        currentMissiles = "Mk.I Missiles"
        missDMG = "100"
        missRE = "5"
    elif (lvlMissile == 2):
        currentMissiles = "Mk.II Missiles"
        missDMG = "200"
        missRE = "5"
    elif (lvlMissile == 3):
        currentMissiles = "Mk.III Missiles"
        missDMG = "250"
        missRE = "4"
    elif (lvlMissile == 4):
        currentMissiles = "Mk.IV Missiles"
        missDMG = "350"
        missRE = "3"
    elif (lvlMissile == 5):
        currentMissiles = "Mk.V Missiles"
        missDMG = "500"
        missRE = "3"
    elif (lvlMissile == "god"):
        currentMissiles = "GOD Missiles"
        missDMG = "1000000"
        missRE = "2"
    else:
        currentMissiles = "Missile level not found. :("
        missDMG = "N/A"
        missRE = "N/A"

    if (lvlAmmo == 1):
        currentAmmo = "Mk.I Ammunition Storage"
        storeRail = "100"
        storeCM = "100"
        storeMiss = "10"
    elif (lvlAmmo == 2):
        currentAmmo = "Mk.II Ammunition Storage"
        storeRail = "200"
        storeCM = "250"
        storeMiss = "25"
    elif (lvlAmmo == 3):
        currentAmmo = "Mk.III Ammunition Storage"
        storeRail = "300"
        storeCM = "500"
        storeMiss = "50"
    elif (lvlAmmo == 4):
        currentAmmo = "Mk.IV Ammunition Storage"
        storeRail = "400"
        storeCM = "750"
        storeMiss = "75"
    elif (lvlAmmo == 5):
        currentAmmo = "Mk.V Ammunition Storage"
        storeRail = "500"
        storeCM = "1000"
        storeMiss = "100"
    elif (lvlAmmo == "god"):
        currentAmmo = "GOD Ammunition Storage"
        storeRail = "Infinite"
        storeCM = "Infinite"
        storeMiss = "Infinite"
    else:
        currentAmmo = "Ammunition Storage level not found. :("
        storeRail = "N/A"
        storeCM = "N/A"
        storeMiss = "N/A"
    return currentArmor
    return currentRailgun
    return currentCM
    return currentMissiles
    return currentAmmo
    return armHP
    return armRE
    return railDMG
    return railRE
    return cmEff
    return missDMG
    return missRE
    return storeRail
    return storeCM
    return storeMiss


def printShipStats():
    shipStats(1, 1, 1, 1, 1)
    print(currentArmor)
    print(">>>HP: " + armHP)
    print(">>>Shield: " + armRE)
    print(currentRailgun)
    print(">>>DMG: " + railDMG)
    print(">>>Reload: " + railRE)
    print(currentCM)
    print(">>>Effective: " + cmEff)
    print(currentMissiles)
    print(">>>DMG: " + missDMG)
    print(">>>Reload: " + missRE)
    print(currentAmmo)
    print(">>>" + storeRail + " Railgun Shells")
    print(">>>" + storeCM + " Counter-Measures")
    print(">>>" + storeMiss + " Missiles")


def enemyEncounter(level):
    print("you have encountered a level " + level + " enemy.")


def store():
    inStore = True
    while (inStore):
        print("Which upgrades would you like to purchase?")
        print("""
        Options:
        >>>Armor Upgrades
        >>>Railgun Upgrades
        >>>Counter-Measure Upgrades
        >>>Missile Upgrades
        >>>Ship Upgrades
        >>>Ammunition Upgrades
        """)
        z = input()
        if (z == "Armor Upgrades"):
            print("""
            To obtain an upgrade, simply type buy, and then the number of the upgrade.
            Ex: buy 2
            Upgrades:
            1.Mk.I Modular Neutrino Armor (Bought)
            2.Mk.II Modular Neutrino Armor -""" + na2 + """
            3.Mk.III Modular Neutrino Armor -""" + na3 + """
            4.Mk.IV Modular Neutrino Armor -""" + na4 + """
            5.Mk.V Modular Neutrino Armor -""" + na5 + """
            >>>Back
        """)
            x = input()
            open(pirateSave, r)

            if(x=="buy "+c):
        elif (z == "Railgun Upgrades"):
            print("""
            Upgrades:
            >>>Mk.I Railgun (Bought)
            >>>Mk.II Railgun -""" + rail2 + """
            >>>Mk.III Railgun -""" + rail3 + """
            >>>Mk.IV Railgun -""" + rail4 + """
            >>>Mk.V Railgun -""" + rail5 + """
            >>>Back
            """)
        elif (z == "Counter-Measure Upgrades"):
            print("""
            Upgrades:
            >>>Mk.I Counter-Measures (Bought)
            >>>Mk.II Counter-Measures -""" + cm2 + """
            >>>Mk.III Counter-Measures -""" + cm3 + """
            >>>Mk.IV Counter-Measures -""" + cm4 + """
            >>>Mk.V Counter Measures -""" + cm5 + """
            >>>Back
            """)
        elif (z == "Missile Upgrades"):
            print("""
            Upgrades:
            >>>Mk.I Missiles (Bought)
            >>>Mk.II Missiles -""" + miss2 + """
            >>>Mk.III Missiles -""" + miss3 + """
            >>>Mk.IV Missles -""" + miss4 + """
            >>>Mk.V Missles -""" + miss5 + """
            >>>Back
            """)
        elif (z == "Ammunition Upgrades"):
            print("""
            Upgrades:
            >>>Mk.I Ammunition Storage (Bought)
            >>>Mk.II Ammunition Storage -""" + amm2 + """
            >>>Mk.III Ammunition Storage -""" + amm3 + """
            >>>Mk.IV Ammunition Storage -""" + amm4 + """
            >>>Mk.V Ammunition Storage -""" + amm5 + """
            >>>Back
            """)
        else:
            print("Sorry, I did not understand what you have typed")


def missileLaunch(Mlevel):
    enemyHealth -= missDMG


printShipStats()

