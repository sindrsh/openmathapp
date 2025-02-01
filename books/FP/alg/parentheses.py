import re

f = open("alg.html", "r")
content = f.read()
text_handler = re.compile('<mfenced>{ ( [^}]* ) }</mfenced>', re.VERBOSE)
content = text_handler.sub(r'<mo>(</mo>\1<mo>)</mo>', content)

outfile = open("converted_html.txt", "w")
outfile.write(content)
outfile.close
