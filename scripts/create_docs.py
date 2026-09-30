from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs' / 'dokumentasi.pdf'
c = canvas.Canvas(str(OUT), pagesize=(595.28, 841.89))
c.setTitle('EduPortal SiberMu - Kemahasiswaan dan AIK')
c.setAuthor('Tim EduPortal SiberMu - identitas perlu dilengkapi')
ink, blue, muted = [HexColor(x) for x in ['#142b49', '#122b4a', '#596775']]
style = ParagraphStyle('body', fontName='Helvetica', fontSize=10.5, leading=16, textColor=muted)

def para(text, x, y, width=499, size=10.5, color=muted):
    p = Paragraph(text, ParagraphStyle('p', parent=style, fontSize=size, leading=size*1.5, textColor=color))
    _, h = p.wrap(width, 760)
    p.drawOn(c, x, y-h)
    return y-h-14

def header(n, label, title):
    c.setFillColor(blue); c.rect(0,810,595.28,32,fill=1,stroke=0)
    c.setFillColor(HexColor('#ffffff')); c.setFont('Helvetica-Bold',9)
    c.drawString(48,822,'EDUPORTAL SIBERMU / KEMAHASISWAAN & AIK')
    c.setFillColor(HexColor('#927134')); c.setFont('Helvetica-Bold',10); c.drawString(48,776,label)
    c.setFillColor(ink); c.setFont('Helvetica-Bold',24); c.drawString(48,737,title)
    c.setStrokeColor(HexColor('#dce2e8')); c.line(48,718,547,718)
    c.setFillColor(muted); c.setFont('Helvetica',8)
    c.drawString(48,32,'Dokumentasi revisi | 30 September 2026')
    c.drawRightString(547,32,f'{n} / 4')

header(1,'01 / IDENTITAS & KONSEP','Kemahasiswaan dan AIK')
+y=0
