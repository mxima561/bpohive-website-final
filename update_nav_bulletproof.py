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
            
            # Find all a tags pointing to sales-development.html
            pattern = re.compile(f'(<a href="{prefix}services/sales-development\\.html"[^>]*>\\s*Sales\\s*Development\\s*</a>)', re.IGNORECASE)
            
            matches = pattern.finditer(content)
            
            # Replace backwards to not mess up indices
            new_content = content
            for match in reversed(list(matches)):
                match_str = match.group(1)
                
                # Extract the exact class string
                class_match = re.search(r'class="([^"]+)"', match_str)
                class_str = class_match.group(1) if class_match else 'block py-2 text-sm text-belkins-dark hover:text-belkins-orange'
                
                replacement = match_str + f'\n                        <a href="{prefix}services/customer-support.html" class="{class_str}">Customer Support</a>'
                
                # Ensure we don't duplicate if it already exists right after (e.g. from previous run)
                # But it's easier to just check if 'services/customer-support.html' is in the content
                new_part = new_content[:match.end()] + f'\n                        <a href="{prefix}services/customer-support.html" class="{class_str}">Customer Support</a>' + new_content[match.end():]
                new_content = new_part
                updated = True

            # If the file already has 'services/customer-support.html' in it in the nav, we might have added it before.
            # actually let's just make sure it's not already there.
            if updated and f'"{prefix}services/customer-support.html"' not in content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Updated Services navigation in {file}")

if __name__ == '__main__':
    update_html_files()
