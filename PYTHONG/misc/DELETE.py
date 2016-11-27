import pickle

accountList=[]
ja=open(accountList, w)
pickle.dump(accountList, accountList)
ja.close()
print("Stage 1 complete")
time.sleep(1)
jb=open(activeAccounts, w)
activeAccounts=[]
pickle.dump(activeAccounts, activeAccounts)
jb.close()
print("Stage 2 complete")
time.sleep(1)
jc=open(mainDB, w)
pArmor = []
pRailgun = []
pCM = []
pMissile = []
pAmmo = []
pickle.dump(pArmor, mainDB)
pickle.dump(pRailgun, mainDB)
pickle.dump(pCM, mainDB)
pickle.dump(pMissile, mainDB)
pickle.dump(pAmmo, mainDB)
credits=[]
pickle.dump(credits, mainDB)
rpg=[]
pickle.dump(rpg, mainDB)
print("Process Completed!")