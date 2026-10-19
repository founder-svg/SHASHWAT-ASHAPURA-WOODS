import urllib.request
import re
import json

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

urls = [
    'https://pixabay.com/videos/search/sawmill/',
    'https://pixabay.com/videos/search/timber/',
    'https://pixabay.com/videos/search/wood/'
]

for url in urls:
    print('Checking', url)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            matches = list(set(re.findall(r'https://cdn\.pixabay\.com/video/[^"\'>\s]+?\.mp4', html)))
            print('Found matches:', len(matches))
            for m in matches[:5]:
                print(' -', m)
    except Exception as e:
        print('Error:', e)
