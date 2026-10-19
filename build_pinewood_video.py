import subprocess
import os

FFMPEG = r"C:\Users\akash\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg.Essentials_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.1-essentials_build\bin\ffmpeg.exe"

print("--- Step 1: Rendering Scene 1 (Pinewood Log Port Yard, 6.5s) ---")
cmd_s1 = [
    FFMPEG, "-y",
    "-loop", "1", "-i", "assets/images/pinewood-log-port-yard.jpg",
    "-vf", "scale=2560:1440,zoompan=z='min(zoom+0.0009,1.18)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=195:s=1920x1080:fps=30",
    "-t", "6.5", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "fast", "temp_sc1.mp4"
]
subprocess.run(cmd_s1, check=True)

print("--- Step 2: Rendering Scene 2 (Pinewood Sawmill Sizing, 7.0s) ---")
cmd_s2 = [
    FFMPEG, "-y",
    "-loop", "1", "-i", "assets/images/pinewood-sawmill-sizing.jpg",
    "-vf", "scale=2560:1440,zoompan=z='1.12':x='(iw-iw/zoom)*(on/210)':y='ih/2-(ih/zoom/2)':d=210:s=1920x1080:fps=30",
    "-t", "7.0", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "fast", "temp_sc2.mp4"
]
subprocess.run(cmd_s2, check=True)

print("--- Step 3: Rendering Scene 3 (Pinewood Formwork Runners, 7.0s) ---")
cmd_s3 = [
    FFMPEG, "-y",
    "-loop", "1", "-i", "assets/images/pinewood-formwork-runners.jpg",
    "-vf", "scale=2560:1440,zoompan=z='min(zoom+0.0006,1.14)':x='iw/2-(iw/zoom/2)':y='(ih-ih/zoom)*(1-on/210)':d=210:s=1920x1080:fps=30",
    "-t", "7.0", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "fast", "temp_sc3.mp4"
]
subprocess.run(cmd_s3, check=True)

print("--- Step 4: Rendering Scene 4 (Pinewood Ready Stock Yards, 7.0s) ---")
cmd_s4 = [
    FFMPEG, "-y",
    "-loop", "1", "-i", "assets/images/product-shutter-pinewood.jpg",
    "-vf", "scale=2560:1707,zoompan=z='max(1.20-0.0009*on,1.0)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=210:s=1920x1080:fps=30",
    "-t", "7.0", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "fast", "temp_sc4.mp4"
]
subprocess.run(cmd_s4, check=True)

print("--- Step 5: Concatenating Scenes with Crossfades ---")
# Total duration: 6.5 + 7.0 + 7.0 + 7.0 = 27.5s (with crossfades: ~26.0s)
# Using xfade filter
cmd_concat = [
    FFMPEG, "-y",
    "-i", "temp_sc1.mp4",
    "-i", "temp_sc2.mp4",
    "-i", "temp_sc3.mp4",
    "-i", "temp_sc4.mp4",
    "-filter_complex",
    "[0:v][1:v]xfade=transition=fade:duration=0.6:offset=5.9[v01]; "
    "[v01][2:v]xfade=transition=fade:duration=0.6:offset=12.3[v02]; "
    "[v02][3:v]xfade=transition=fade:duration=0.6:offset=18.7[outv]",
    "-map", "[outv]",
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "fast", "temp_scenes_faded.mp4"
]
subprocess.run(cmd_concat, check=True)

print("--- Step 6: Compositing Triple Brand Plaque, Professional Lower-Thirds & Cinematic Audio ---")
# Lower thirds for each section
# Font: Arial or Segoe UI Bold
font_path = "C\\:/Windows/Fonts/segoeuib.ttf"
plaque_path = "assets/images/triple-brand-badge-plaque.png"
audio_path = "assets/audio/shashwat-cinematic-theme.mp3"
output_video = "assets/videos/pinewood-timber-runners-branding.mp4"

filter_complex = (
    # Scale plaque to width 620
    "[1:v]scale=620:-1[plaque]; "
    # Overlay plaque at top-right with margin 40px
    "[0:v][plaque]overlay=W-w-40:40[v_branded]; "
    # Scene 1 Lower-Third (0 to 6.2s)
    f"[v_branded]drawtext=fontfile='{font_path}':text='GLOBAL PINEWOOD LOG SOURCING':fontsize=22:fontcolor='#D4AF37':x=50:y=H-125:box=1:boxcolor='black@0.75':boxborderw=8:enable='between(t,0,6.2)', "
    f"drawtext=fontfile='{font_path}':text='Direct Mill Vessel Imports • Kandla & Gandhidham Seaport Yards':fontsize=28:fontcolor=white:x=50:y=H-75:box=1:boxcolor='black@0.75':boxborderw=8:enable='between(t,0,6.2)', "
    # Scene 2 Lower-Third (6.2 to 12.6s)
    f"drawtext=fontfile='{font_path}':text='PRECISION MILLING & SIZING':fontsize=22:fontcolor='#D4AF37':x=50:y=H-125:box=1:boxcolor='black@0.75':boxborderw=8:enable='between(t,6.2,12.6)', "
    f"drawtext=fontfile='{font_path}':text='Calibrated 2x3, 3x4, 4x4 Sawn Pinewood Runners & Battens':fontsize=28:fontcolor=white:x=50:y=H-75:box=1:boxcolor='black@0.75':boxborderw=8:enable='between(t,6.2,12.6)', "
    # Scene 3 Lower-Third (12.6 to 19.0s)
    f"drawtext=fontfile='{font_path}':text='CIVIL FORMWORK STAGING':fontsize=22:fontcolor='#D4AF37':x=50:y=H-125:box=1:boxcolor='black@0.75':boxborderw=8:enable='between(t,12.6,19.0)', "
    f"drawtext=fontfile='{font_path}':text='High-Load Slab & Column Timber Framing • Zero Deflection':fontsize=28:fontcolor=white:x=50:y=H-75:box=1:boxcolor='black@0.75':boxborderw=8:enable='between(t,12.6,19.0)', "
    # Scene 4 Lower-Third (19.0 to 25.5s)
    f"drawtext=fontfile='{font_path}':text='MASSIVE READY BUFFER':fontsize=22:fontcolor='#D4AF37':x=50:y=H-125:box=1:boxcolor='black@0.75':boxborderw=8:enable='between(t,19.0,26.0)', "
    f"drawtext=fontfile='{font_path}':text='Kiln-Dried Pinewood Bundles • Ready for Same-Day Dispatch':fontsize=28:fontcolor=white:x=50:y=H-75:box=1:boxcolor='black@0.75':boxborderw=8:enable='between(t,19.0,26.0)'[outv]"
)

cmd_final = [
    FFMPEG, "-y",
    "-i", "temp_scenes_faded.mp4",
    "-i", plaque_path,
    "-i", audio_path,
    "-filter_complex", filter_complex,
    "-map", "[outv]",
    "-map", "2:a",
    "-c:v", "libx264", "-b:v", "3500k", "-pix_fmt", "yuv420p", "-preset", "medium",
    "-c:a", "aac", "-b:a", "192k",
    "-af", "afade=t=out:st=23.5:d=1.5",
    "-shortest",
    "-movflags", "+faststart",
    output_video
]
subprocess.run(cmd_final, check=True)
print(f"Video created successfully at: {output_video}")

print("--- Step 7: Generating High-Res Poster Image ---")
poster_path = "assets/images/pinewood-timber-branding-poster.jpg"
cmd_poster = [
    FFMPEG, "-y",
    "-ss", "00:00:02.5",
    "-i", output_video,
    "-frames:v", "1",
    "-q:v", "2",
    poster_path
]
subprocess.run(cmd_poster, check=True)
print(f"Poster created successfully at: {poster_path}")
