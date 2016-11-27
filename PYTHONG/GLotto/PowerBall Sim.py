import random

playAgain=True
while(playAgain)
    open(jackpot, a)
    jackpot = pickle.load(jackpot, saveJackpot)
    if(jackpot<1000000):
        jackpot+=1000000
    jackpot+=1000
    number1=random.randint(1,69)
    number2=random.randint(1,69)
    number3=random.randint(1,69)
    number4=random.randint(1,69)
    number5=random.randint(1,69)
    powerball=random.randint(1,26)
    check==True
    while(check):
        if(number1==number2):
            number2=random.randint(1,69)
        elif(number1==number3):
            number3=random.randint(1,69)
        elif(number1==number4):
            number4=random.randint(1,69)
        elif(number1==number5):
            number5=random.randint(1,69)
        elif(number2==number3):
            number3 = random.randint(1, 69)
        elif(number2==number4):
            number3 = random.randint(1, 69)
        elif(number2==number5):
            number4 = random.randint(1, 69)
        elif(number3==number4):
            number4 = random.randint(1, 69)
        elif(number3==number5):
            number5 = random.randint(1, 69)
        elif(number4==number5):
            number5 = random.randint(1, 69)
        else:
            check=False

    genNumbers=[number1, number2, number3, number4, number5, powerball]

    print("Type in first five numbers, they must be from 1 to 69:")
    print("Please enter the first number:")
    gnum1=input()
    print("Please enter the second number:")
    gnum2=input()
    print("Please enter the third number:")
    gnum3=input()
    print("Please enter the fourth number:")
    gnum4=input()
    print("Please enter the fifth number:")
    gnum5=input()
    check1=True
    while (check1):
        if(gnum1 == gnum2):
            print("The first and second numbers are the same!")
            print("Please type in new number:")
            gnum2 = input()
        elif(gnum1 == gnum3):
            print("The first and third numbers are the same!")
            print("Please type in new number:")
            gnum3 = input()
        elif(gnum1 == gnum4):
            print("The first and fourth numbers are the same!")
            print("Please type in new number:")
            gnum4 = input()
        elif(gnum1 == gnum5):
            print("The first and fifth numbers are the same!")
            print("Please type in new number:")
            gnum5 = input()
        elif(gnum2 == gnum3):
            print("The second and third numbers are the same!")
            print("Please type in new number:")
            gnum3 = input()
        elif(gnum2 == gnum4):
            print("The second and fourth numbers are the same!")
            print("Please type in new number:")
            gnum3 = input()
        elif(gnum2 == gnum5):
            print("The second and fifth numbers are the same!")
            print("Please type in new number:")
            gnum4 = input()
        elif(gnum3 == gnum4):
            print("The third and fourth numbers are the same!")
            print("Please type in new number:")
            gnum4 = input()
        elif(gnum3 == gnum5):
            print("The third and fifth numbers are the same!")
            print("Please type in new number:")
            gnum5 = input()
        elif(gnum4 == gnum5):
            print("The fourth and fifth numbers are the same!")
            print("Please type in new number:")
            gnum5 = input()
        else:
            check1 = False
    check2 = True
    while(check2):
        if(gnum1<1 or gnum1>69):
            print("The first number is not within 1 to 69!")
            gnum1=input()
        if(gnum2<1 or gnum2>69):
            print("The second number is not within 1 to 69!")
            gnum1 = input()
        if(gnum3<1 or gnum3>69):
            print("The third number is not within 1 to 69!")
            gnum1=input()
        if(gnum4<1 or gnum4>69):
            print("The fourth number is not within 1 to 69!")
            gnum1=input()
        if(gnum5<1 or gnum5>69):
            print("The fifth number is not within 1 to 69!")
            gnum1=input()
    print("Please enter the powerball number:")
    gnump=input()
    while(gnump>26 or gnump<1):
        print("Powerball not within 1-26")
        print("Please enter powerball number again:")
        gnup=input()

    inNumbers=[gnum1, gnum2, gnum3, gnum4, gnum5, gnump]
    if(inNumbers==genNumbers):
        print("CONGRATULATIONS!!!")
        print("YOU HAVE WON THE POWERBALL JACKPOT!!!")
        print(jackpot+" CREDITS HAVE BEEN ADDED TO YOUR ACCOUNT!")
        AccountSys.accountCredits(add, jackpot)
        jackpot=1000000
        pickle.dump(jackpot, saveJackpot)
        print("Play again? (Y/N)")
        kl = input.lower()
        if (kl == "y"):
            print("Restarting...")
        else:
            print("Thank you for playing the Powerball Simulator!")
            print("Goodbye!")
            playAgain = False
    else:
        print("Sorry! The numbers do not match. :(")
        print("Play again? (Y/N)")
        kl=input.lower()
        if(kl=="y"):
            print("Restarting...")
        else:
            print("Thank you for playing the Powerball Simulator!")
            print("Goodbye!")
            playAgain=False
