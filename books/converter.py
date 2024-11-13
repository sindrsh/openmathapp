import re

f = open("../../../openmathbooks/MB/neg/neg_bm.tex", "r")
alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
substitutes = [
    ['\\\\label{ ( [^}]* ) }', ''],
    ['\\\\section{ ( [^}]* ) }', r'<h2 class="section">\1</h2>'],
    ['\\\\subsection[*]{ ( [^}]* ) }', r'<h3 class="subsection">\1</h2>'],
    ['\\\\index{ ( [^}]* ) }', ''],
    ['\\\\footnote{ ( [^}]* ) }', r''],
    ['\\\\cdot', r'<mo></mo>'],
    ['\\\\hrs{ ( [^}]* ) }{seksjon}', 'seksjon ??'],
    ['\\\\hrs{ ( [^}]* ) }{regel}', 'regel ??'],
    ['\\\\hrs{ ( [^}]* ) }{kapittel}', 'kapittel ??'],
    ['\\\\rref{ ( [^}]* ) }', 'regel ??'],
    ['\\\\outl{ ( [^}]* ) }', r'<span class="outline">\1</span>'],
    ['\\\\textit{ ( [^}]* ) }', r'<i>\1</i>'],
    ['\\\\textsl{ ( [^}]* ) }', r'<i>\1 </i>'],
    ['\\\\text{ ( [^}]* ) }', r'<mtext>\1</mtext>'],
    ['\\\\frac{ ( [^}]* ) }{ ( [^}]* ) }', r'<mfrac>\1 \2</mfrac>'],
    ['\\\\alg{ ( [^}]* ) }', r'<math class="aligned-math" display="block">\1</math>'],
    ['\\\\sym{ ( [^}]* ) }', r'<span class="symbol"> \1</span>'],
    ['\\\\item{ ( [^\\\\item]* )', r'<li> /1 </li>'],
    ['\\\\fig{ ( [^}]* ) }', r'<div class="figure">\1</div>'],
    ['\\\\begin{itemize} ( [^}]* ) \\\\end{itemize}', r'<ul>\1</ul>'],
    ['\\\\begin{tabular} ( [^}]* ) \\\\end{tabular}', r'<table>\1</table>'],
    ['\\\\spr{ ( [^}]* ) }', r'<div class="language-box">\1</div>'],
    ['\\\\st{ ( [^}]* ) }', r'<div class="statement">\1</div>'],
    ['\\\\reg\\[([^\\[]*)\\]{( [^}]* ) }', r'<div class="rule" data-title="\1">\2</div>'],
    ['\\\\regdef\\[([^\\[]*)\\]{( [^}]* ) }', r'<div class="definition" data-title="\1">\2</div>'],
    ['\\\\info{([^}]*)}{( [^}]* ) }', r'<div class="info" data-title="\1">\2</div>'],
    ['\\\\eks\\[\\]{ ( [^}]* ) }', r'<div class="example">\1</div>'],
    ['\\\\eks{ ( [^}]* ) }', r'<div class="example">\1</div>'],
    ['\\\\eks\\[1\\]{ ( [^}]* ) }', r'<div class="example" data-number="1"">\1</div>'],
    ['\\\\eks\\[2\\]{ ( [^}]* ) }', r'<div class="example" data-number="2"">\1</div>'],
    ['\\\\eks\\[3\\]{ ( [^}]* ) }', r'<div class="example" data-number="3"">\1</div>'],
    ['\\\\eks\\[4\\]{ ( [^}]* ) }', r'<div class="example" data-number="4"">\1</div>'],
    ['\\\\eks\\[5\\]{ ( [^}]* ) }', r'<div class="example" data-number="5"">\1</div>'],
    ['\\\\eks\\[6\\]{ ( [^}]* ) }', r'<div class="example" data-number="6"">\1</div>'],
    ['\\\\eks\\[7\\]{ ( [^}]* ) }', r'<div class="example" data-number="7"">\1</div>'],
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

class Math_line_converter:
    def __init__(self, line):
        self.math = line.replace("\\", "")
        self.math = self.math.replace("</div>", "")
        self.math = self.math.replace("-", "−")
        self.id_list = []
        self.text_list = []
    
    def avoid_html(self, tag):
        cnt = 0
        for enclosed_text in re.findall(r'<%s>.*?</%s>' % (tag, tag), self.math):
            self.text_list.append(enclosed_text)
            self.math = self.math.replace(enclosed_text, "mtext%s" % alphabet[cnt])
            self.id_list.append("mtext%s" % alphabet[cnt])
            cnt += 1

    def get_line(self):
        
        for tag in ["mtext", "mfrac", "mo", "i"]:
            self.avoid_html(tag)
        
        alphas = re.findall(r"[a-zA-Z]+", self.math)
        numbers = re.findall(r"\d+", self.math) 
        
        id_list = self.id_list
        text_list = self.text_list
        
        
        for o in ["(", "[", "|"]:
            for l in re.findall("left\\%s" % o, self.math):
                self.math = self.math.replace(l, "%s{" % o)
        
        for o in [")", "]", "|"]:        
            for r in re.findall("right\\%s" % o, self.math):
                self.math = self.math.replace(r, "}%s" % o)    
        
        operators = []
        
        for o in re.findall(r"[^0-9a-zA-Z\s]", self.math):
            if o not in operators and o not in ["{", "}"]:
                operators.append(o)
                
        for a in alphas:
            if a not in id_list:
              self.math = self.math.replace(a, "<mi>%s</mi>" % a)
        for n in numbers:
            self.math = self.math.replace(n, "<mn>%s</mn>" % n)
        for o in operators:
            self.math = self.math.replace(o, "<mo>%s</mo>" % o)
        
        self.math = self.math.replace("{", "<mrow>")
        self.math = self.math.replace("}", "</mrow>")
        
        cnt = 0
        for text_id in id_list:
            self.math = self.math.replace(text_id, text_list[cnt])
            cnt += 1   
        return self.math
        
        

def latex_lines_to_math(latex_lines):
    for i in range(len(latex_lines)):
        conv = Math_line_converter(latex_lines[i])
        latex_lines[i] = conv.get_line()

text_handler = re.compile('\\\\\\[ (.*?)\\\\\\]', re.VERBOSE)
display_math = text_handler.findall(content)

latex_lines_to_math(display_math)
for math in display_math:
    content = text_handler.sub('<math class="display-math" display="block">%s</math>' % math, content, 1)

aligned_math = re.findall(r'<math class="aligned-math" display="block">(.*?)</math>', content, re.DOTALL)

table_math = []
for aligned in aligned_math:
    aligned = aligned.replace("\n", "")
    aligned = aligned.replace("\t", "")
    aligned = aligned.replace("\t2", "")
    aligned = aligned.replace("=", "")
    
    new_line = ''
    for line in aligned.split("\\\\"):
        for i in range(len(line.split("&"))):
            side = line.split("&")[i]
            conv = Math_line_converter(side)
            if i == 0:
                new_line += r'<mtd class="math-left-column"> %s </mtd> \n <mtd class="math-center-column"><mo>=</mo> </mtd>' % conv.get_line()
            else:
                new_line += r'<mtd class="math-right-column"> %s </mtd>' % conv.get_line()
        new_line += r'<mtr> %s </mtr>' % new_line    
        table_math.append(new_line)
    
for i in range(len(aligned_math)):
    content = re.sub(r'<math class="aligned-math" display="block">(.*?)</math>', table_math[i], content, 1, re.DOTALL)

inline_math = re.findall('\\$(.*?)\\$', content)
latex_lines_to_math(inline_math)

for math in inline_math:
    content = re.sub('\\$(.*?)\\$', r'<math> %s </math>' % math, content, 1)

outfile = open("converted_html.txt", "w")
outfile.write(content)
outfile.close

