import Tkinter as tk
from Tkinter import *
import init, time, os

global gridx
global gridy

root = tk.tk()

def textBox(text, lines, chars, row, column, rowspan, columnspan, ipadx, ipady, padx, pady, sticky, self):
    self = Text(root, height=lines, width=chars)
    self.grid(row=row, column=column, rowspan=rowspan, columnspan=columnspan, ipadx=ipadx, ipady=ipady, padx=padx,
              pady=pady, sticky=sticky)
    self.insert(END, text)


def entryBox(row, column, rowspan, columnspan, ipadx, ipady, padx, pady, sticky):
    bo = Entry(root)
    bo.grid(row=row, column=column, rowspan=rowspan, columnspan=columnspan, ipadx=ipadx, ipady=ipady, padx=padx, pady=pady, sticky=sticky)
    def input(): bo.get()


def Label(text, row, column, rowspan, columnspan, ipadx, ipady, padx, pady, sticky):
    self = Label(text=text)
    self.grid(row=row, column=column, rowspan=rowspan, columnspan=columnspan, ipadx=ipadx, ipady=ipady, padx=padx,
              pady=pady, sticky=sticky)


def Button(text, command, row, column, rowspan, columnspan, ipadx, ipady, padx, pady, sticky, self):
    self = tk.Button(self, text=text, command=command)
    self.grid(row=row, column=column, rowspan=rowspan, columnspan=columnspan, ipadx=ipadx, ipady=ipady, padx=padx,
              pady=pady, sticky=sticky)


def clock(set):
    if set == True:
        def setDate():

        def setTime():
            setting = True
            while setting:
                jkl = Label("Please select Timezone:"
                jkl.grid(row=0, column=0)
                mla = entryBox(1, 0)
                mla.input()

def wid_countdown(Integer int, Integer gridx, Integer gridy):
    for(i in range int):
        textBox(int, 1, 99999999999, gridx, gridy)

#gr and gc are starting cell of grid place
def wid_Login(gr, gc):
    ubc = gc + 1
    pl1 = gr + 1
    pl2 = gc + 1
    sbr = gr + 2
    usernameL=Label("Username:", gr, gc)
    usernameBox=entryBox(gr, ubc)
    passwordL=Label("Password:", pl1, gc)
    passwordBox=entryBox(pl1, pl2)
    def getUsername():
        usernameBox.get()
    def getPassword():
        passwordBox.get()
    def checkValues():
        username=usernameBox.get()
        password=passwordBox.get()
        loginint=init.login(username, password)
        if(loginint==0):
            unload()
            lo1=Label("Login Successful", gr, gc, 1, 2)
            time.sleep(5)
            lo1.grid_remove()
            userwelcome="Welcome "+username+"!"
            lo2=Label(userwelcome, gr, gc, 1, 2)



    loginButton=Button("Login", checkValues(), sbr, pl2)
    registerButton=Button("Register", init.register(), sbr, gc)
    def unload():
        usernameL.grid_remove()
        usernameBox.grid_remove()
        passwordL.grid_remove()
        passwordBox.grid_remove()
        loginButton.grid_remove()
        registerButton.grid_remove()

def Menu():
    console = Text(root, height=16)
    console.grid(row=1, column=0, rowspan=4, columnspan=3)
    console.see(END)
    consoleL = Label("Console:")
    consoleL.grid(row=0, column=1)
    def redirect(out=sys.stdout.write):
        console.insert(INSERT, out)
    inpt = Entry(root)
    inpt.grid(row=5, column=0, columnspan=2)
    def getInp(): input.get()
    global input = getInp()
    enterSign = "⏎"
    enterCommand = Button(enterSign, input, 4, 1, 1, 1, 0, 0, 0, 0)
    clock = clock()
    wid_clock = Button(clock, clock.setTime(), 8, 12)
    quit = Button(quit, "Exit ⇨", init.exit(), 0, 12)

    %
    %

    def unload():
        consoleL.grid_remove()
        console.grid_remove()
        inpt.grid_remove()
        enterCommand.grid_remove()
        wid_clock.grid_remove()
        quit.grid_remove()

def mustLogin(self):
    Label(parent, text=input()).pack()
    entry = Entry(parent, **options)
    if width:
        entry.config(width=width)
    entry.grid()
    return entry

class renderStuffs(screen):
    if screen==0: Menu()




