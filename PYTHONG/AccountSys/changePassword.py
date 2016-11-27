import init

print("Welcome!")
init.login(False)
print("You must first type your current password to change your password.")
print("Please type your current password:")
kl=input()
kj= init.getPubIP()
he=open(activeAccounts, a)
pickle.load(activeAccounts)
hi=activeAccounts.get(kj, 0)
hi1=hi.split(' ',1)
h=open(accountList, a)
pickle.load(accountList)
accountList.get