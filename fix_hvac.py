import re

with open('blog-roofing-hvac-lead-generation.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add hero image & author metadata
header_pattern = r'(<div class="bg-\[#20292f\] text-white pt-32 pb-20">[\s\S]*?<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">[\s\S]*?<h1 class="text-4xl md:text-5xl font-bold mb-4">.*?</h1>[\s\S]*?<p class="text-xl text-white/70 max-w-2xl mt-4">[\s\S]*?</p>[\s\S]*?</div>[\s\S]*?</div>)'

new_header = """<!-- Header with Image -->
    <div class="relative bg-[#20292f] text-white pt-32 pb-20 overflow-hidden">
        <div class="absolute inset-0">
            <img src="assets/hvac_hero.jpg" alt="Roofing and HVAC Lead Generation" class="w-full h-full object-cover opacity-20">
            <div class="absolute inset-0 bg-gradient-to-t from-[#20292f] via-[#20292f]/80 to-transparent"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="flex items-center space-x-4 mb-6">
                <span class="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-medium border border-amber-500/30">Home Services</span>
                <span class="text-gray-400 text-sm flex items-center"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 5 min read</span>
                <span class="text-gray-400 text-sm flex items-center"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> Mar 12, 2026</span>
            </div>
            <h1 class="text-4xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">Roofing & HVAC Lead Gen:<br/><span class="text-amber-400">Build a Predictable Pipeline</span></h1>
            <p class="text-2xl text-white/80 max-w-2xl mt-6 font-light">
                (Without Relying on Luck)
            </p>
            
            <div class="mt-10 flex items-center space-x-4">
                <div class="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center text-xl font-bold border-2 border-white/20 shadow-lg">BPO</div>
                <div>
                    <p class="font-medium text-lg">BPO Hive Growth Team</p>
                    <p class="text-amber-300 text-sm">Home Services Specialists</p>
                </div>
            </div>
        </div>
    </div>"""

content = re.sub(header_pattern, new_header, content)

# 2. Main content wrapper -> Grid layout
main_content_pattern = r'(<!-- Main Content -->\n\s*<div class=")max-w-4xl( mx-auto px-4 sm:px-6 lg:px-8 py-16">)'
content = re.sub(main_content_pattern, r'\1max-w-7xl\2\n        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">\n            <!-- Sidebar / TOC -->\n            <div class="hidden lg:block lg:col-span-4">\n                <div class="sticky top-24 bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">\n                    <h4 class="text-gray-900 font-bold uppercase tracking-wider text-sm mb-4">Table of Contents</h4>\n                    <ul class="space-y-3 text-sm text-gray-600">\n                        <li><a href="#intro" class="hover:text-amber-600 transition-colors">Introduction</a></li>\n                        <li><a href="#step-1" class="hover:text-amber-600 transition-colors">Stop measuring "leads"</a></li>\n                        <li><a href="#step-2" class="hover:text-amber-600 transition-colors">Pick the right channel mix</a></li>\n                        <li><a href="#step-3" class="hover:text-amber-600 transition-colors">Use a simple offer</a></li>\n                        <li><a href="#step-4" class="hover:text-amber-600 transition-colors">Follow-up is the difference</a></li>\n                        <li><a href="#step-5" class="hover:text-amber-600 transition-colors">Appointment confirmation</a></li>\n                        <li><a href="#scripts" class="hover:text-amber-600 transition-colors">Practical Scripts</a></li>\n                    </ul>\n                    \n                    <div class="mt-8 pt-8 border-t border-gray-200">\n                        <h4 class="font-bold text-gray-900 mb-2">Tired of empty calendars?</h4>\n                        <p class="text-gray-500 text-sm mb-4">Let our team handle the follow-up so your crews can run more estimates.</p>\n                        <button onclick="openBookingModal()" class="w-full py-3 bg-bpo-blue text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg">Get a Free Strategy Plan</button>\n                    </div>\n                </div>\n            </div>\n\n            <!-- Article Content -->\n            <div class="lg:col-span-8 prose prose-lg max-w-none text-gray-700">\n            <div id="intro"></div>', content)

# 3. Add closing div to Article Content
article_close_pattern = r'(Ready to build a predictable pipeline\?[\s\S]*?</button>\n\s*</div>\n\s*</article>)'
content = re.sub(article_close_pattern, r'\1\n            </div> <!-- end col -->\n        </div> <!-- end grid -->', content)

# 4. Enhance Headers and Add IDs
content = content.replace('<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Step 1:', '<h2 id="step-1" class="text-3xl font-extrabold text-gray-900 mt-16 mb-6 tracking-tight border-b border-gray-100 pb-4">Step 1:')
content = content.replace('<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Step 2:', '<h2 id="step-2" class="text-3xl font-extrabold text-gray-900 mt-16 mb-6 tracking-tight border-b border-gray-100 pb-4">Step 2:')
content = content.replace('<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Step 3:', '<h2 id="step-3" class="text-3xl font-extrabold text-gray-900 mt-16 mb-6 tracking-tight border-b border-gray-100 pb-4">Step 3:')
content = content.replace('<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Step 4:', '<h2 id="step-4" class="text-3xl font-extrabold text-gray-900 mt-16 mb-6 tracking-tight border-b border-gray-100 pb-4">Step 4:')
content = content.replace('<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Step 5:', '<h2 id="step-5" class="text-3xl font-extrabold text-gray-900 mt-16 mb-6 tracking-tight border-b border-gray-100 pb-4">Step 5:')
content = content.replace('<h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">Scripts', '<h2 id="scripts" class="text-3xl font-extrabold text-gray-900 mt-16 mb-6 tracking-tight border-b border-gray-100 pb-4">Scripts')
content = content.replace('<h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">Where outsourcing', '<h2 class="text-3xl font-extrabold text-gray-900 mt-16 mb-6 tracking-tight border-b border-gray-100 pb-4">Where outsourcing')
content = content.replace('<h2 class="text-2xl font-bold text-gray-900 mt-12 mb-4">How BPO', '<h2 class="text-3xl font-extrabold text-gray-900 mt-16 mb-6 tracking-tight border-b border-gray-100 pb-4">How BPO')

# Add badges for steps
content = re.sub(r'<h2 id="step-(\d+)" class="(.*?)">(Step \d+): (.*?)</h2>', r'<h2 id="step-\1" class="\2 flex items-center"><span class="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-sm font-bold mr-4 shadow-sm">\3</span> \4</h2>', content)

# 5. Fix Lists (Custom Checkmarks)
ul_pattern = r'<ul class="list-disc pl-6 mb-8 space-y-2">'
new_ul = '<ul class="space-y-3 mb-8 ml-0 pl-0 list-none">'
content = content.replace(ul_pattern, new_ul)
content = content.replace('<ul class="list-disc pl-6 mb-4 space-y-2">', new_ul)
content = content.replace('<ul class="list-disc pl-6 mb-6 space-y-2">', new_ul)
content = content.replace('<ul class="list-disc pl-6 mb-2 space-y-2">', new_ul)
content = content.replace('<ul class="list-disc pl-6 mb-12 space-y-2">', new_ul)


li_pattern = r'<li>([\s\S]*?)</li>'
new_li = r'<li class="flex items-start"><svg class="w-6 h-6 text-amber-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span class="text-gray-700 leading-relaxed">\1</span></li>'
content = re.sub(li_pattern, new_li, content)

# 6. Green/Red Flag Callouts (using generic styling)
content = content.replace('<p class="mb-8 font-semibold italic">If you can’t see those numbers, you can’t scale.</p>',
                          '<div class="my-10 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl"><div class="flex"><div class="flex-shrink-0"><svg class="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><div class="ml-3"><h3 class="text-sm font-bold text-amber-800 uppercase tracking-wider">The Golden Rule</h3><div class="mt-2 text-amber-700"><p class="font-medium">If you can’t see those numbers, you can’t scale.</p></div></div></div></div>')

content = content.replace('<p class="mb-6 italic text-gray-600">A simple reactivation sequence can generate booked jobs fast.</p>',
                          '<div class="my-8 bg-green-50/50 border-l-4 border-green-500 p-5 rounded-r-xl"><div class="flex"><div class="ml-3 text-sm text-green-700"><p class="font-bold">Pro Tip:</p> A simple reactivation sequence can generate booked jobs fast.</div></div></div>')

# 7. Script Bubbles
for old_div in ['<div class="bg-blue-50 p-6 rounded-lg border border-blue-100">']:
    content = content.replace(old_div, '<div class="bg-gray-50/80 p-8 rounded-2xl border border-gray-200/60 shadow-sm relative overflow-hidden group hover:border-amber-500/30 hover:shadow-md transition-all">')

# 8. Enhance text
content = content.replace('<p class="text-xl mb-8">', '<p class="text-xl leading-relaxed text-gray-600 mb-8 font-medium">')

with open('blog-roofing-hvac-lead-generation.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated blog-roofing-hvac-lead-generation.html")
