import pip
import modules.pipinst.setup as pipsetup
import renderStuffs
import setuptools

import modules.stinst.setup as stsetup

def install_import(package):
    import importlib
    try:
        importlib.import_module(package)
    except:
        try:
            try:
                importlib.import_module(package=setuptools)
            except:
                stsetup()
        except:
            try:
                importlib.import_module(package=pip)
                pip.main(['install', package])
            except:
                pipsetup()
                pip.main(['install', package])
                pip.main(['install', package])



renderStuffs.textBox("")
renderStuffs.Button("", installscript(), 1, 0)
