import os
import re

def update_html_files():
    target_dir = '/Users/aly/Desktop/bpohive-website-final'
    
    for root, _, files in os.walk(target_dir):
        for file in files:
            if not file.endswith('.html'):
                continue
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()

            is_root = (root == target_dir)
            prefix = '' if is_root else '../'

            updated = False
            
            # Desktop drop-down (belkins-dark)
            pattern1 = re.compile(f'(<a href="{prefix}services/sales-development\\.html"[^>]*>\\s*Sales\\s*Development\\s*</a>)')
            if pattern1.search(content) and f'services/customer-support.html' not in content:
                match = pattern1.search(content).group(1)
                class_match = re.search(r'class="([^"]+)"', match)
                class_str = class_match.group(1) if class_match else 'block p-2 text-sm text-belkins-dark hover:text-belkins-orange transition-colors'
                
                replacement = match + f'\n                                        <a href="{prefix}services/customer-support.html" class="{class_str}">Customer Support</a>'
                content = content.replace(match, replacement)
                updated = True

            # Mobile drop-down
            pattern2 = re.compile(f'(<a href="{prefix}services/sales-development\\.html"[^>]*class="[^"]*block py-2[^"]*"[^>]*>\\s*Sales\\s*Development\\s*</a>)')
            if pattern2.search(content):
                # We need to make sure we only append if we haven't already appended
                # but earlier logic prevented it. Actually if both match, we might append twice if the second check doesn't check for existence.
                # Actually, in some files the 'services/customer-support.html' might be added by pattern1, but pattern2 is for a different part of the file (mobile).
                # So we just check if it's already right after the match.
                match = pattern2.search(content).group(1)
                class_match = re.search(r'class="([^"]+)"', match)
                class_str = class_match.group(1) if class_match else 'block py-2 text-sm text-belkins-dark hover:text-belkins-orange'
                
                replacement = match + f'\n                        <a href="{prefix}services/customer-support.html" class="{class_str}">Customer Support</a>'
                if replacement not in content:
                    content = content.replace(match, replacement)
                    updated = True

            if updated:
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Updated Services navigation in {file}")

if __name__ == '__main__':
    update_html_files()
