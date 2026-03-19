import os

def update_html_files():
    target_dir = '/Users/aly/Desktop/bpohive-website-final'
    
    for root, _, files in os.walk(target_dir):
        for file in files:
            if not file.endswith('.html'):
                continue
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()

            # Fix paths if in subdirectory
            is_root = (root == target_dir)
            prefix = '' if is_root else '../'

            updated = False
            
            # --- 1. Modify Desktop Services Dropdown (mainly in index.html, industries.html) ---
            desktop_target = f'<a href="{prefix}services/sales-development.html" class="block p-2 text-sm text-belkins-dark hover:text-belkins-orange transition-colors">Sales Development</a>'
            desktop_replacement = desktop_target + f'\n                                        <a href="{prefix}services/customer-support.html" class="block p-2 text-sm text-belkins-dark hover:text-belkins-orange transition-colors">Customer Support</a>'
            if desktop_target in content:
                content = content.replace(desktop_target, desktop_replacement)
                updated = True
                
            # Same for pages using bpo-dark / bpo-blue (if they have desktop nav)
            desktop_target_2 = f'<a href="{prefix}services/sales-development.html" class="block p-2 text-sm text-bpo-dark hover:text-bpo-blue transition-colors">Sales Development</a>'
            desktop_replacement_2 = desktop_target_2 + f'\n                                        <a href="{prefix}services/customer-support.html" class="block p-2 text-sm text-bpo-dark hover:text-bpo-blue transition-colors">Customer Support</a>'
            if desktop_target_2 in content:
                content = content.replace(desktop_target_2, desktop_replacement_2)
                updated = True

            # --- 2. Modify Mobile Services Dropdown (all pages) ---
            mobile_target = f'<a href="{prefix}services/sales-development.html" class="block py-2 text-sm text-belkins-dark hover:text-belkins-orange">Sales Development</a>'
            mobile_replacement = mobile_target + f'\n                        <a href="{prefix}services/customer-support.html" class="block py-2 text-sm text-belkins-dark hover:text-belkins-orange">Customer Support</a>'
            if mobile_target in content:
                content = content.replace(mobile_target, mobile_replacement)
                updated = True
                
            mobile_target_2 = f'<a href="{prefix}services/sales-development.html" class="block py-2 text-sm text-bpo-dark hover:text-bpo-blue">Sales Development</a>'
            mobile_replacement_2 = mobile_target_2 + f'\n                        <a href="{prefix}services/customer-support.html" class="block py-2 text-sm text-bpo-dark hover:text-bpo-blue">Customer Support</a>'
            if mobile_target_2 in content:
                content = content.replace(mobile_target_2, mobile_replacement_2)
                updated = True

            if updated:
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Updated Services navigation in {filepath}")

if __name__ == '__main__':
    update_html_files()
