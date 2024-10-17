import re

f = open("neg_bm.tex", "r")

content = f.read()
text_handler = re.compile('section{ ( [^}]* ) }', re.VERBOSE)
content = text_handler.sub(r's{\1}', content)
print(content)

