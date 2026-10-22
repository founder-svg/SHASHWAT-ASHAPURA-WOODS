import re
import fitz

def create_transparent_assets():
    with open("assets/images/saw-logo-hd.svg", "r", encoding="utf-8") as f:
        svg_full = f.read()

    svg_transparent = svg_full
    
    # Remove image tag and its wrapping clip paths
    svg_transparent = re.sub(r'<clipPath id="clip_1">.*?</clipPath>', '', svg_transparent, flags=re.DOTALL)
    svg_transparent = re.sub(r'<clipPath id="clip_2">.*?</clipPath>', '', svg_transparent, flags=re.DOTALL)
    svg_transparent = re.sub(r'<g clip-path="url\(#clip_1\)">.*?</g>\s*</g>\s*</g>', '', svg_transparent, flags=re.DOTALL)
    svg_transparent = re.sub(r'<image id="image_3".*?/>', '', svg_transparent, flags=re.DOTALL)
    svg_transparent = re.sub(r'<rect x="1" y="1" width="251\.9997".*?/>', '', svg_transparent)
    svg_transparent = re.sub(r'<linearGradient id="plaqueGoldEdge".*?</linearGradient>', '', svg_transparent, flags=re.DOTALL)
    svg_transparent = re.sub(r'<clipPath id="plaqueRoundedClip">.*?</clipPath>', '', svg_transparent, flags=re.DOTALL)
    svg_transparent = re.sub(r'<g id="saw-plaque-container" clip-path="url\(#plaqueRoundedClip\)">', '<g id="saw-transparent-container">', svg_transparent)
    # Remove the dark navy #06134c background rect from CorelDRAW
    svg_transparent = re.sub(r'<path[^>]*fill="#06134c"[^>]*/>', '', svg_transparent)
    # Ensure motto text glyphs use rich brown #682A12 instead of black
    svg_transparent = re.sub(r'fill="#231f20"', 'fill="#682A12"', svg_transparent)

    # Save transparent SVGs
    with open("assets/images/saw-logo-transparent-hd.svg", "w", encoding="utf-8") as f:
        f.write(svg_transparent)
    with open("assets/images/saw-logo-transparent.svg", "w", encoding="utf-8") as f:
        f.write(svg_transparent)
    print("Saved transparent SVGs!")

    # Render transparent PNG at 300 DPI
    doc = fitz.open("assets/images/saw-logo-transparent-hd.svg")
    page = doc[0]
    pix = page.get_pixmap(dpi=300, alpha=True)
    pix.save("assets/images/saw-logo-transparent.png")
    print(f"Saved saw-logo-transparent.png: {pix.width} x {pix.height}")

if __name__ == "__main__":
    create_transparent_assets()
