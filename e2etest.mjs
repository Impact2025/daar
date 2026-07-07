const BASE = 'http://localhost:3100'
const J = { 'Content-Type': 'application/json' }
const cookies = new Map()
function setCookie(res) {
  const sc = res.headers.get('set-cookie'); if (!sc) return
  for (const e of sc.split(/,(?=\s*[^ ,;]+=)/)) {
    const m = e.match(/^\s*([^=;]+)=([^;]*)/); if (m) cookies.set(m[1].trim(), m[2].trim())
  }
}
function cookieHeader() { return Array.from(cookies.entries()).map(([k,v])=>`${k}=${v}`).join('; ') }
async function login() {
  const csrfRes = await fetch(`${BASE}/api/auth/csrf`, { cache:'no-store' }); setCookie(csrfRes)
  const { csrfToken } = await csrfRes.json()
  const loginRes = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method:'POST', headers:{ 'Content-Type':'application/x-www-form-urlencoded', cookie:cookieHeader() },
    body: new URLSearchParams({ csrfToken, email:'admin@daar.nl', password:'daar2024!', callbackUrl:`${BASE}/admin`, json:'true' }),
    redirect:'manual' })
  setCookie(loginRes)
  const s = await (await fetch(`${BASE}/api/auth/session`,{headers:{cookie:cookieHeader()},cache:'no-store'})).json()
  return !!s?.user
}
async function postJSON(p,b){const r=await fetch(`${BASE}${p}`,{method:'POST',headers:{...J,cookie:cookieHeader()},body:JSON.stringify(b)});return{ok:r.ok,status:r.status,data:await r.json().catch(()=>null)}}
async function getJSON(p){const r=await fetch(`${BASE}${p}`,{headers:{cookie:cookieHeader()},cache:'no-store'});return{ok:r.ok,status:r.status,data:await r.json().catch(()=>null)}}

(async()=>{
  console.log('LOGIN:', await login() ? 'OK' : 'FAIL')
  const queries = ['welzijnsorganisaties Amsterdam','vrijwilligersorganisaties Rotterdam','buurtcentrum Utrecht']
  for (const q of queries) {
    const t0=Date.now()
    const r = await postJSON('/api/admin/lead-machine/search', { query:q, maxResults:5 })
    const dt=((Date.now()-t0)/1000).toFixed(1)
    const res = r.data?.results || []
    console.log(`\n=== "${q}" (${dt}s, ${res.length} results) ===`)
    res.forEach(x=>console.log(`  [${x.aiScore ?? 'null'}] ${x.name} | ${x.email||'-'} | ${x.website||'-'}`))
  }
  // cleanup: delete all test leads
  const list = await getJSON('/api/admin/lead-machine/leads?limit=100')
  for (const l of list.data?.leads||[]) {
    await fetch(`${BASE}/api/admin/lead-machine/leads?id=${l.id}`,{method:'DELETE',headers:{cookie:cookieHeader()}})
  }
  const after = await getJSON('/api/admin/lead-machine/leads')
  console.log(`\nCLEANUP: ${list.data?.total} leads verwijderd, rest=${after.data?.total}`)
})().catch(e=>{console.error('CRASH',e);process.exit(1)})
