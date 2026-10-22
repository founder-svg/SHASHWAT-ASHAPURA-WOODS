from PIL import Image, ImageDraw

def generate_triple_brand_plaque():
    # Width and height of the triple brand plaque (2x resolution for retina sharpness: 1840 x 320)
    W, H = 1840, 320
    
    # Create background ivory plaque
    img = Image.new("RGBA", (W, H), (253, 249, 242, 255))
    draw = ImageDraw.Draw(img)
    
    # Outer gold border with rounded corners
    draw.rounded_rectangle([4, 4, W - 5, H - 5], radius=16, outline=(198, 146, 85, 180), width=3)
    # Inner gold border
    draw.rounded_rectangle([10, 10, W - 11, H - 11], radius=12, outline=(218, 175, 105, 90), width=1)
    
    # Vertical dividers
    div1_x = 610
    div2_x = 1230
    draw.line([(div1_x, 24), (div1_x, H - 25)], fill=(198, 146, 85, 140), width=2)
    draw.line([(div2_x, 24), (div2_x, H - 25)], fill=(198, 146, 85, 140), width=2)
    
    # 1. Load SAW logo (enhanced with wood grain and flawless motto)
    saw = Image.open("assets/images/saw-logo-hd.png").convert("RGBA")
    # Fit into box: x: 30 to 580 (width 550), y: 20 to 300 (height 280)
    saw_max_w, saw_max_h = 520, 270
    saw_ratio = min(saw_max_w / saw.width, saw_max_h / saw.height)
    saw_w, saw_h = int(saw.width * saw_ratio), int(saw.height * saw_ratio)
    saw_resized = saw.resize((saw_w, saw_h), Image.Resampling.LANCZOS)
    saw_x = 25 + (580 - saw_w) // 2
    saw_y = (H - saw_h) // 2
    img.paste(saw_resized, (saw_x, saw_y), saw_resized)
    
    # 2. Load WudPlus logo
    wud = Image.open("assets/images/wudplus-logo-transparent.png").convert("RGBA")
    wud_max_w, wud_max_h = 550, 240
    wud_ratio = min(wud_max_w / wud.width, wud_max_h / wud.height)
    wud_w, wud_h = int(wud.width * wud_ratio), int(wud.height * wud_ratio)
    wud_resized = wud.resize((wud_w, wud_h), Image.Resampling.LANCZOS)
    wud_x = div1_x + (div2_x - div1_x - wud_w) // 2
    wud_y = (H - wud_h) // 2
    img.paste(wud_resized, (wud_x, wud_y), wud_resized)
    
    # 3. Load COMMANDO logo
    cmd = Image.open("assets/images/commando-logo-transparent.png").convert("RGBA")
    cmd_max_w, cmd_max_h = 550, 250
    cmd_ratio = min(cmd_max_w / cmd.width, cmd_max_h / cmd.height)
    cmd_w, cmd_h = int(cmd.width * cmd_ratio), int(cmd.height * cmd_ratio)
    cmd_resized = cmd.resize((cmd_w, cmd_h), Image.Resampling.LANCZOS)
    cmd_x = div2_x + (W - 25 - div2_x - cmd_w) // 2
    cmd_y = (H - cmd_h) // 2
    img.paste(cmd_resized, (cmd_x, cmd_y), cmd_resized)
    
    # Save 2x version and standard 920x160 version
    img_standard = img.resize((920, 160), Image.Resampling.LANCZOS)
    img_standard.save("assets/images/triple-brand-badge-plaque.png")
    print("Rebuilt assets/images/triple-brand-badge-plaque.png successfully!")

if __name__ == "__main__":
    generate_triple_brand_plaque()
