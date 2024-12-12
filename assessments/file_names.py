import os

files = os.listdir("./neg")
for f in files:
    print('"' + f + '"' + ': {},')
