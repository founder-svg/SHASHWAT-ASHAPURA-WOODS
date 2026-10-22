import fitz
import re

def build_enhanced_logo():
    # Load original client PDF
    pdf_path = "shashwat ashapura woods.  FINLE (1).pdf"
    doc = fitz.open(pdf_path)
    page = doc[0]
    
    # 1. Export SVG with pure vector glyphs (no font dependency)
    svg_raw = page.get_svg_image()
    
    # Keep width="253.9997" height="145.6321" viewBox="0 0 253.9997 145.6321"
    # Add plaque enhancements: luxury gold/amber border, rounded corners, clean metadata
    defs_insert = """<linearGradient id="plaqueGoldEdge" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#E8C68A" stop-opacity="0.9"/>
  <stop offset="50%" stop-color="#C89658" stop-opacity="0.65"/>
  <stop offset="100%" stop-color="#8A5320" stop-opacity="0.9"/>
</linearGradient>
<clipPath id="plaqueRoundedClip">
  <rect x="0.5" y="0.5" width="252.9997" height="144.6321" rx="8" ry="8" />
</clipPath>
"""
    
    defs_idx = svg_raw.find('<defs>') + len('<defs>')
    svg_with_defs = svg_raw[:defs_idx] + "\n" + defs_insert + svg_raw[defs_idx:]
    
    defs_end = svg_with_defs.find('</defs>') + len('</defs>')
    closing_svg = svg_with_defs.rfind('</svg>')
    
    inner_body = svg_with_defs[defs_end:closing_svg]
    
    border_overlay = """  <rect x="1" y="1" width="251.9997" height="143.6321" rx="7.5" ry="7.5" fill="none" stroke="url(#plaqueGoldEdge)" stroke-width="1.2" />"""
    
    enhanced_svg = (
        svg_with_defs[:defs_end] +
        '\n<g id="saw-plaque-container" clip-path="url(#plaqueRoundedClip)">\n' +
        inner_body +
        '\n' + border_overlay + '\n</g>\n</svg>'
    )
    
    # Save enhanced SVGs to all asset locations
    target_svgs = [
        "assets/images/saw-logo-hd.svg",
        "assets/images/saw-logo-plaque.svg",
        "assets/images/saw-logo.svg",
        "assets/images/saw-logo-badge.svg"
    ]
    for target in target_svgs:
        with open(target, "w", encoding="utf-8") as f:
            f.write(enhanced_svg)
        print(f"Written: {target}")
        
    # Render ultra high resolution PNGs (1059 x 607 at 300 DPI)
    doc_enhanced = fitz.open("assets/images/saw-logo-hd.svg")
    page_enhanced = doc_enhanced[0]
    pix_hd = page_enhanced.get_pixmap(dpi=300)
    
    target_pngs = [
        "assets/images/saw-logo-plaque.png",
        "assets/images/saw-logo-badge.png",
        "assets/images/saw-logo-hd.png"
    ]
    for target in target_pngs:
        pix_hd.save(target)
        print(f"Saved PNG: {target}")
        
    print(f"Rendered dimensions: {pix_hd.width} x {pix_hd.height}")

if __name__ == "__main__":
    build_enhanced_logo()
