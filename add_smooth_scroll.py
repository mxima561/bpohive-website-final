import glob

def add_smooth_scroll():
    script = """
    <script>
        // Smooth scrolling for TOC links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>"""

    for filepath in glob.glob('/Users/aly/Desktop/bpohive-website-final/blog-*.html'):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'Smooth scrolling for TOC' not in content:
            content = content.replace('</body>', script)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Added smooth scroll to {filepath}")

add_smooth_scroll()
