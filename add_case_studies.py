import os, glob, re

pattern = re.compile(
    r'(^[ \t]*)(<li[^>]*>\s*)?(<a[^>]*href=["\'](?:\.\./)*blogs\.html["\'][^>]*>)([\s\S]*?)(</a>)(\s*</li>)?',
    re.MULTILINE
)

def build_script():
    count = 0
    for filepath in glob.glob('/Users/aly/Desktop/bpohive-website-final/**/*.html', recursive=True):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        def replacer(match):
            indent = match.group(1)
            li_start = match.group(2) or ""
            a_start = match.group(3)
            a_text = match.group(4)
            a_end = match.group(5)
            li_end = match.group(6) or ""
            
            # If text isn't what we expect, skip
            if not re.search(r'Blogs|Case[\s\n]*studies', a_text, re.IGNORECASE):
                return match.group(0)
                
            b_text = re.sub(r'Case[\s\n]*studies', 'Blogs', a_text, flags=re.IGNORECASE).strip()
            # if previous text was already "Blogs", use it
            if 'Blogs' in a_text:
                b_text = a_text
            blogs_link = a_start + b_text + a_end
            
            c_text = 'Case studies'
            case_start = a_start.replace('blogs.html', 'case-studies.html')
            
            # Text transformation: if b_text had multiple lines, c_text should just be "Case studies".
            # The previous script broke the alignment for some elements, but "Case studies" is clean.
            case_link = case_start + c_text + a_end
            
            part1 = indent + li_start + blogs_link + li_end
            part2 = indent + li_start + case_link + li_end
            
            return part1 + '\n' + part2

        new_content = pattern.sub(replacer, content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            print(f"Updated {filepath}")
    print(f"Total files updated: {count}")

build_script()
