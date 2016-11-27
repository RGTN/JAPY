

def erroring():
    for i in range(0, 15):
        print("""
        ****** **** **** ****** ****  * * *
       *      *  * *  * *    * *  *  * * *
      ****   **** **** *    * ****  * * *
     *      * *  * *  *    * * *
    ****** *  * *  * ****** *  *  * * *
            """)
            time.sleep(1)

def understandError():
    for i in range(0, 15):
        print("Sorry, I did not understand")
        time.sleep(1)
        z+=1
    print("Would you like to end the loop? (Y/N)")
    print("""
    Options:
    >>>Y
    >>>N
    >>>Moob
    >>>Boom
    """)
    h=input()
    if(h=="Y"):
        print("Okay, what you ask for you shall get.")
        print("Loop ending...")
    elif(h=="N"):
        while(1==1):
            print("Sorry, I did not understand")
            input()
    elif(h=="Moob"):
        print("You have moob, also known as bomb")
    elif(h=="Boom"):
        print("When I shove you off the top of a mountain, using nothing but compute power,")
        print("there is a sonic boom, approximately 2957.55 feet from the bottom of the mountain.")
        print("What would you like to do?")
        print("""
        Options:
        1.die with the sonic boom
        >>>teleport to a safe location
        >>>joobla
        >>>Go die!
        >>>exit
        """)
        x = input()
        if(x == 1):
        elif(x==2):