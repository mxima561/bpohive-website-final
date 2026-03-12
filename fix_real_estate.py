import re

with open('blog-real-estate-recruitment.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add hero image & author metadata
header_pattern = r'(<div class="bg-\[#20292f\] text-white pt-32 pb-20">[\s\S]*?<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">[\s\S]*?<h1 class="text-4xl md:text-5xl font-bold mb-4">.*?</h1>[\s\S]*?<p class="text-xl text-white/70 max-w-2xl mt-4">[\s\S]*?</p>[\s\S]*?</div>[\s\S]*?</div>)'

new_header = """<!-- Header with Image -->
    <div class="relative bg-[#20292f] text-white pt-32 pb-20 overflow-hidden">
        <div class="absolute inset-0">
            <img src="assets/real_estate_hero.jpg" alt="Real Estate Recruiting" class="w-full h-full object-cover opacity-20">
            <div class="absolute inset-0 bg-gradient-to-t from-[#20292f] via-[#20292f]/80 to-transparent"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="flex items-center space-x-4 mb-6">
                <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">Real Estate</span>
                <span class="text-gray-400 text-sm flex items-center"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 6 min read</span>
                <span class="text-gray-400 text-sm flex items-center"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> Mar 12, 2026</span>
            </div>
            <h1 class="text-4xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">Real Estate Recruitment:<br/><span class="text-blue-400">How to Hire Top Agents</span></h1>
            <p class="text-2xl text-white/80 max-w-2xl mt-6 font-light">
                (and Build a System That Scales)
            </p>
            
            <div class="mt-10 flex items-center space-x-4">
                <div class="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold border-2 border-white/20 shadow-lg">BPO</div>
                <div>
                    <p class="font-medium text-lg">BPO Hive Growth Team</p>
                    <p class="text-blue-300 text-sm">Lead Generation Experts</p>
                </div>
            </div>
        </div>
    </div>"""

content = re.sub(header_pattern, new_header, content)

# 2. Main content wrapper -> Grid layout
main_content_pattern = r'(<!-- Main Content -->\n\s*<div class=")max-w-4xl( mx-auto px-4 sm:px-6 lg:px-8 py-16">)'
content = re.sub(main_content_pattern, r'\1max-w-7xl\2\n        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">\n            <!-- Sidebar / TOC -->\n            <div class="hidden lg:block lg:col-span-4">\n                <div class="sticky top-24 bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">\n                    <h4 class="text-gray-900 font-bold uppercase tracking-wider text-sm mb-4">Table of Contents</h4>\n                    <ul class="space-y-3 text-sm text-gray-600">\n                        <li><a href="#intro" class="hover:text-bpo-blue transition-colors">Introduction</a></li>\n                        <li><a href="#why-hard" class="hover:text-bpo-blue transition-colors">Why recruitment is hard</a></li>\n                        <li><a href="#ideal-agent" class="hover:text-bpo-blue transition-colors">The ideal agent scorecard</a></li>\n                        <li><a href="#pipeline" class="hover:text-bpo-blue transition-colors">Build an "always-on" pipeline</a></li>\n                        <li><a href="#scripts" class="hover:text-bpo-blue transition-colors">Proven outbound scripts</a></li>\n                        <li><a href="#bpo" class="hover:text-bpo-blue transition-colors">How BPO Hive accelerates growth</a></li>\n                    </ul>\n                    \n                    <div class="mt-8 pt-8 border-t border-gray-200">\n                        <h4 class="font-bold text-gray-900 mb-2">Want predictable meetings?</h4>\n                        <p class="text-gray-500 text-sm mb-4">Let our team handle the outbound so your brokers can focus on closing.</p>\n                        <button onclick="openBookingModal()" class="w-full py-3 bg-bpo-blue text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg">Get a Free Strategy Plan</button>\n                    </div>\n                </div>\n            </div>\n\n            <!-- Article Content -->\n            <div class="lg:col-span-8 prose prose-lg prose-blue max-w-none text-gray-700">\n            <div id="intro"></div>', content)

# 3. Add closing div to Article Content
article_close_pattern = r'(Ready to scale your brokerage[\s\S]*?</button>\n\s*</div>\n\s*</article>)'
content = re.sub(article_close_pattern, r'\1\n            </div> <!-- end col -->\n        </div> <!-- end grid -->', content)

# 4. Enhance Headers and Add IDs for TOC
content = content.replace('<h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">Why real estate', '<h2 id="why-hard" class="text-3xl font-extrabold text-gray-900 mt-16 mb-6 tracking-tight border-b border-gray-100 pb-4">Why real estate')
content = content.replace('<h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">The ideal real', '<h2 id="ideal-agent" class="text-3xl font-extrabold text-gray-900 mt-16 mb-6 tracking-tight border-b border-gray-100 pb-4">The ideal real')
content = content.replace('<h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">How to build an', '<h2 id="pipeline" class="text-3xl font-extrabold text-gray-900 mt-16 mb-6 tracking-tight border-b border-gray-100 pb-4">How to build an')
content = content.replace('<h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">Scripts that work', '<h2 id="scripts" class="text-3xl font-extrabold text-gray-900 mt-16 mb-6 tracking-tight border-b border-gray-100 pb-4">Scripts that work')
content = content.replace('<h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">How BPO', '<h2 id="bpo" class="text-3xl font-extrabold text-gray-900 mt-16 mb-6 tracking-tight border-b border-gray-100 pb-4">How BPO')

# Enhance subheaders
content = re.sub(r'<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">(\d+\) [\s\S]*?)</h3>', r'<h3 class="text-xl font-bold text-gray-900 mt-10 mb-4 flex items-center group"><span class="w-8 h-8 rounded-full bg-bpo-blue/10 text-bpo-blue flex items-center justify-center text-sm mr-3 font-bold group-hover:bg-bpo-blue group-hover:text-white transition-colors">\1</span></h3>', content)
content = content.replace('>1) ', '>1<').replace('>2) ', '>2<').replace('>3) ', '>3<').replace('>4) ', '>4<').replace('>5) ', '>5<')


# 5. Fix Lists (Custom Checkmarks)
ul_pattern = r'<ul class="list-disc pl-6 mb-8 space-y-2">'
new_ul = '<ul class="space-y-3 mb-8 ml-0 pl-0 list-none">'
content = content.replace(ul_pattern, new_ul)
content = content.replace('<ul class="list-disc pl-6 mb-4 space-y-2">', new_ul)

li_pattern = r'<li>([\s\S]*?)</li>'
new_li = r'<li class="flex items-start"><svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span class="text-gray-700 leading-relaxed">\1</span></li>'
content = re.sub(li_pattern, new_li, content)

# 6. Green Flag Callouts
content = re.sub(r'<p class="mb-8"><span class="font-semibold text-green-600">Green flag:</span> (.*?)</p>', 
                 r'<div class="mb-10 bg-green-50/50 border-l-4 border-green-500 p-5 rounded-r-xl shadow-sm"><div class="flex"><div class="flex-shrink-0"><svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><div class="ml-3"><h3 class="text-sm font-bold text-green-800 uppercase tracking-wider">Green Flag</h3><div class="mt-1 text-sm text-green-700"><p>\1</p></div></div></div></div>', content)

# 7. Red Flag Callout
content = content.replace('<p class="mb-8 font-semibold italic">The fastest way to fail outbounding is handing it to a broker who only wants to close.</p>',
                          '<div class="my-10 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl"><div class="flex"><div class="flex-shrink-0"><svg class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></div><div class="ml-3"><h3 class="text-sm font-bold text-red-800 uppercase tracking-wider">Common Pitfall</h3><div class="mt-2 text-red-700"><p class="font-medium">The fastest way to fail outbounding is handing it to a broker who only wants to close.</p></div></div></div></div>')

# 8. Script Bubbles
for old_div in ['<div class="bg-blue-50 p-6 rounded-lg border border-blue-100">']:
    content = content.replace(old_div, '<div class="bg-gray-50/80 p-8 rounded-2xl border border-gray-200/60 shadow-sm relative overflow-hidden group hover:border-bpo-blue/30 hover:shadow-md transition-all">')

# 9. Blockquote
content = content.replace('<p class="text-xl mb-8">', '<p class="text-xl leading-relaxed text-gray-600 mb-8 font-medium">')

with open('blog-real-estate-recruitment.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated blog-real-estate-recruitment.html")
