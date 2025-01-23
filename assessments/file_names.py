import os

files = os.listdir("./geo")
for f in files:
    f = f.replace(".html", "")
    print('"' + f + '"' + ': {},')
