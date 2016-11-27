def accountInfo():
    print("Your account can be used with all games as well as tools like BankBot!")
    print("Your account can also be used with Chat!")
    print("Unfortunately, the Chat feature has not yet been developed.")

def register():
    print("Thank you for your interest in PythonG Live!")
    print("You are now taking the first step to infinite fun.")
    newuser=True
    while(newuser)
        print("Please type in your new Username")
        newUsern=input()
        print("Please confirm your new Username:")
        newUsernc=input()
        if(newUsern==newUsernc):
            newuserpin=True
            while(newuserpin)
                print("Please enter your new Password:")
                newUserp=input()
                print("Please confirm your new Password:")
                newUserpc=input()
                if(newUserp==newUserpc):
                    print("Success! Your account has been created.")

                    k=str(newUsernc+"-"+newUserpc)
                    ka=open(accountList)
                    pickle.load(accountList, accountList)
                    accountList.append(k:0)
                    hc = open(mainDB)
                    pickle.loads(credits)
                    credits.append(k:1000)
                    pickle.dump(credits, mainDB)
                    pickle.loads(pArmor)
                    pArmor.append(k:1)
                    pickle.dump(pArmor, mainDB)
                    pickle.loads(pRailgun)
                    pRailgun.append(k:1)
                    pickle.dump(pRailgun, mainDB)
                    pickle.loads(pCM)
                    pCM.append(k:1)
                    pickle.dump(pCM, mainDB)
                    pickle.loads(pMissile)
                    pMissile.append(k:1)
                    pickle.dump(pMissile, mainDB)
                    pickle.loads(pAmmo)
                    pAmmo.append(k:1)
                    pickle.dump(pAmmo, mainDB)
                    pickle.loads(RPG)
                    RPG.append(k:0)
                    pickle.dump(RPG, mainDB)
                    hc.close()
                    newuser=False
                    newuserpin=False
                else:
                    print("The passwords do not match.")

print("Welcome to the PythonG account portal!")
print("What would you like me to do today?")
if(isAdmin==true)
    print("""
Here are your options:
>>>Play the RPG Game
>>>Play the Pirate Game
>>>Change Username
>>>Change Password
>>>Access AdminTools
>>>Exit
    """)
else:
    print("""
Here are your options:
>>>Play the RPG Game
>>>Play the Pirate Game
>>>Change Username
>>>Change Password
>>>Exit
    """)