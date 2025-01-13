import os

files = os.listdir("./pro")
for f in files:
    f = f.replace(".html", "")
    print('"' + f + '"' + ': {},')
