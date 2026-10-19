import urllib.request
import json
import urllib.parse

queries = ['pine logs', 'sawmill timber', 'lumber wood']
headers = {'User-Agent': 'ShashwatWoodsBot/1.0 (educational research; contact@shashwatwoods.com)'}

for q in queries:
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch={urllib.parse.quote(q + ' filetype:video')}&srlimit=10"
    print("Searching:", q)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read().decode('utf-8'))
            results = data.get('query', {}).get('search', [])
            print(f"Found {len(results)} videos for {q}:")
            for item in results:
                title = item['title']
                print(" -", title)
                # get file url
                info_url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&titles={urllib.parse.quote(title)}"
                req2 = urllib.request.Request(info_url, headers=headers)
                with urllib.request.urlopen(req2, timeout=10) as r2:
                    d2 = json.loads(r2.read().decode('utf-8'))
                    pages = d2.get('query', {}).get('pages', {})
                    for pid, pdata in pages.items():
                        for ii in pdata.get('imageinfo', []):
                            print("    URL:", ii.get('url'))
    except Exception as e:
        print("Error:", e)
