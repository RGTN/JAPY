import init

print("Welcome! Welcome!")
jk=open(activeAccounts)
pickle.load(activeAccounts)

kl= init.getPubIP()
jk=activeAccounts.get(kl, 0)
if(jk==0):
    print("Please sign in with your PythonG Live account please:")
    signIn()
else:
    print("Which lottery would you like to play today?")
