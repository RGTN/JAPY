import urllib
from urllib import request
import AccountSys
import PythonG

def game(Integer game):
    game = open("pout", "wb")
    game.write(String("Game: "+game))
    game.close()
def wait(seconds):
    print("Processing...")
    time.sleep(seconds)

def getPubIP():
    fip1 = str(urllib.request.urlopen('https://api.ipify.org').read())
    fip2=ip.replace("b","")
    ip=fip2.replace("\'","")
    return ip

def login(username, password):
    print("Kill urself")

def login1(canGuest):
    fip2=getPubIP()
    print("You are accessing the PythonG from "+fip2+".")
    print("Please log in to your PythonG account now."
    print("Welcome to PythonG Live!")
    print("You have been asked to Login or Register because a MiniApp requires a PythonG account to run properly.")
    print("You have several options:")
    print("""
    Options: (Enter Choice Number)
    1.Login
    2.Register
    3.Exit to PythonG
    """)
    print("If you do not have an account, please type 'register'(case-sensitive) when prompted for your username.")
    logginIn=True
    while(loggingIn):
        print("Please type in your username:")
        kl=input()
        if(kl=="register"):
            register()
            logginIn=False
        else:
            print("Please type in your password:")
            km=input()
            jk=kl+" "+km
            kjh=dict.get(jk, -1)
            if(kjh=-2):
                print("User banned until further notice.")
                if (canGuest == True):
                    print("Proceed as guest? (Y/N)")
                    kjl = input.lower()
                    if (kjl="n"):
                        print("You are now logging in again...")
                    else:
                        print("Proceeding as guest...")
                        break
            elif(kjh=-1):
                print("Error, user not found.")
                if(canGuest==True):
                    print("Proceed as guest? (Y/N)")
                    kjl=input.lower()
                    if(kjl="n"):
                        print("You are now logging in again...")
                    else:
                        print("Proceeding as guest...")
                        break
                else:
                    print("Since you do not have an account, register now? (Y/N)")
                    foo=input.lower()
                    if(foo="y"):
                        AccountSys.register()
                    elif():
                        print("You can't proceed without registering.")
                        print("Taking you to main menu.")
                        PythonG()
            else:
                activeAccounts.append(fip2, kjh)
                logginIn=False
#YOLO###
def exit():
    jk=open(activeAccounts, a)
    pickle.load(activeAccounts)
    hj=getPubIP()
    del activeAccounts[hj]
    pickle.dump(activeAccounts)
    jk.close()
    exit()