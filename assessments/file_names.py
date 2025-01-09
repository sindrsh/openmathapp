import os

files = os.listdir("./dec")
for f in files:
    f = f.replace(".html", "")
    print('"' + f + '"' + ': {},')
