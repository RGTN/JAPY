import pickle

def createNewUser():
    k = open(accountLists, a)
    print("Enter username of user to create:")
    newUsern = input()
    passwordCreate = True
    while(passwordCreate):
        print("Enter password:")
        newUserp = input()
        print("Confirm password")
        newUserc = input()
        if(newUserp==newUserc):
            k=newUsern+" "+newUserc
            print("Please enter access level of user:")
            print("""
Options:
1.Normal
2.Moderator
3.Admin
4.Executive
5.Co-Owner
6.ROOT
7.Cancel
            """)
            h=open(accountList, a)
            l=input()
            if(l=1):
                pickle.loads(accountList)
                accountList.append(k:0)
                pickle.dump(accountList, accountList)
            elif(l=2):
                pickle.loads(accountList)
                accountList.append(k:1)
                pickle.dump(accountList, accountList)
            elif(l=3):
                pickle.loads(accountList)
                accountList.append(k:2)
                pickle.dump(accountList, accountList)
            elif(l=4):
                pickle.loads(accountList)
                accountList.append(k:3)
                pickle.dump(accountList, accountList)
            elif(l=5):
                pickle.loads(accountList)
                accountList.append(k:4)
                pickle.dump(accountList, accountList)
            elif(l=6):
                pickle.loads(accountList)
                accountList.append(k:5)
                pickle.dump(accountList, accountList)
            else:
                print("ERROR! The account could not be created.")
                break
            h.close
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
            print("Success! The account was created.")
            passwordCreate=False
        else:
            print("The passwords are not the same.")