import os, glob

for filepath in glob.glob('/Users/aly/Desktop/bpohive-website-final/**/*.html', recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # replace the href
    new_content = content.replace('href="case-studies.html"', 'href="blogs.html"')
    new_content = new_content.replace('href="../case-studies.html"', 'href="../blogs.html"')
    
    # replace the text inside the a tags
    new_content = new_content.replace('>Case studies</a>', '>Blogs</a>')
    new_content = new_content.replace('>Case Studies</a>', '>Blogs</a>')
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated links in {filepath}")
