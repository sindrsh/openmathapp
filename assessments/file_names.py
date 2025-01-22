import os

files = os.listdir("./div")
for f in files:
    f = f.replace(".html", "")
    print('"' + f + '"' + ': {},')
