const res = await fetch('https://www.bing.com/search?q=' + encodeURIComponent('welzijnsorganisaties Amsterdam') + '&setlang=nl-NL&cc=NL', {
  headers: { 'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'Accept-Language':'nl-NL,nl;q=0.9' },
  signal: AbortSignal.timeout(12000),
})
const html = await res.text()
const blocks = html.split(/(?=<li class="b_algo")/)
const b = blocks[1] || ''
// cite tags often hold the displayed domain
const cites = [...b.matchAll(/<cite[^>]*>([\s\S]*?)<\/cite>/g)].map(m=>m[1].replace(/<[^>]+>/g,'').trim())
console.log('cites in block[1]:', JSON.stringify(cites.slice(0,3)))
// also grab visible domain text like "organisatie.nl"
const dom = [...b.matchAll(/(?:https?:\/\/)?([a-z0-9-]+\.(?:nl|com|org|eu)\b)(?:\/|$)/gi)].map(m=>m[1])
console.log('domains in block[1]:', [...new Set(dom)].slice(0,8))
// full block[1] text (stripped) first 400 chars
console.log('--- text ---')
console.log(b.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().slice(0,400))
