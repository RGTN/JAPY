import Tkinter as tk
import renderStuffs

class GUI(tk.Frame):
    def init(self, master=None):
        tk.Frame.init(self, master)
        self.grid()
        renderStuffs(0)
    init()
gui = gui()
gui.master.title("The PythonG")
gui.mainloop()