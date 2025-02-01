import re

f = open("alg_bm.tex", "r")
alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
substitutes = [
    ['\\\\label{ ( [^}]* ) }', ''],
    ['\\\\section{ ( [^}]* ) }', r'<h2 class="section-title">\1</h2>'],
    ['\\\\subsection[*]{ ( [^}]* ) }', r'<h3 class="subsection-title">\1</h3>'],
    ['\\\\subsubsection[*]{ ( [^}]* ) }', r'<h4 class="subsubsection-title">\1</h4>'],
    ['\\\\index{ ( [^}]* ) }', ''],
    ['\\\\footnote{ ( [^}]* ) }', r''],
    ['\\\\hrs{ ( [^}]* ) }{seksjon}', '<span class="reference-section" data-reference=""> </span>'],
    ['\\\\hrs{ ( [^}]* ) }{regel}', '<span class="reference-rule" data-reference=""> </span>'],
    ['\\\\hrs{ ( [^}]* ) }{kapittel}', '<span class="reference-chapter" data-reference=""> </span>'],
    ['\\\\rref{ ( [^}]* ) }', 'regel ??'],
    ['\\\\outl{ ( [^}]* ) }', r'<span class="outline">\1</span>'],
    ['\\\\textit{ ( [^}]* ) }', r'<i>\1</i>'],
    ['\\\\textsl{ ( [^}]* ) }', r'<i>\1 </i>'],
    ['\\\\text{ ( [^}]* ) }', r'<mtext>\1</mtext>'],
    ['\\\\sym{ ( [^}]* ) }', r'<span class="symbol"> \1</span>'],
    ['\\\\item{ ( [^\\\\item]* )', r'<li> /1 </li>'],
    ['\\\\fig{ ( [^}]* ) }', r'<div class="figure">\1</div>'],
    ['\\\\begin{itemize} ( [^}]* ) \\\\end{itemize}', r'<ul>\1</ul>'],
    ['\\\\begin{tabular} ( [^}]* ) \\\\end{tabular}', r'<table>\1</table>'],
    ['\\\\spr{ ( [^}]* ) }', r'<div class="language-box">\1</div>'],
    ['\\\\st{ ( [^}]* ) }', r'<div class="statement">\1</div>'],
    ['\\\\reg\\[([^\\[]*)\\]{( [^}]* ) }', r'<div class="rule"><h4>\1</h4> \2</div>'],
    ['\\\\regdef\\[([^\\[]*)\\]{( [^}]* ) }', r'<div class="definition">\2</div>'],
    ['\\\\info{([^}]*)}{( [^}]* ) }', r'<div class="info"> <h4>\1</h4> \2</div>'],
    ['\\\\eks\\[\\]{ ( [^}]* ) }', r'<div class="example">\1</div>'],
    ['\\\\eks{ ( [^}]* ) }', r'<div class="example">\1</div>'],
    ['\\\\eks\\[1\\]{ ( [^}]* ) }', r'<div class="example">\1</div>'],
    ['\\\\eks\\[2\\]{ ( [^}]* ) }', r'<div class="example">\1</div>'],
    ['\\\\eks\\[3\\]{ ( [^}]* ) }', r'<div class="example">\1</div>'],
    ['\\\\eks\\[4\\]{ ( [^}]* ) }', r'<div class="example">\1</div>'],
    ['\\\\eks\\[5\\]{ ( [^}]* ) }', r'<div class="example">\1</div>'],
    ['\\\\eks\\[6\\]{ ( [^}]* ) }', r'<div class="example">\1</div>'],
    ['\\\\eks\\[7\\]{ ( [^}]* ) }', r'<div class="example">\1</div>'],
]

content = f.read()
content = content.replace("\\input{../../doc}", "")
content = content.replace("\\input{../../preamb}", "")
content = content.replace("\\input{../bm}", "")
content = content.replace("\\begin{document}", "")
content = content.replace("\\end{document}", "")
content = content.replace("\\vsk", "")
content = content.replace("\\vsb", "")
content = content.replace("\\vs", "")
content = content.replace("\\sv", "")
content = content.replace("\\regv", "")
content = content.replace("\\newpage", "")
content = content.replace("\\begin{center}", "")
content = content.replace("\\end{center}", "")


for substitution in substitutes:
    text_handler = re.compile(substitution[0], re.VERBOSE)
    content = text_handler.sub(substitution[1], content)

outfile = open("converted_html.txt", "w")
outfile.write(content)
outfile.close
