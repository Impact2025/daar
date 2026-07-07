const BASE='http://localhost:3100'
const cookies=new Map()
function setC(r){const s=r.headers.get('set-cookie');if(!s)return;for(const e of s.split(/,(?=\s*[^ ,;]+=)/)){const m=e.match(/^\s*([^=;]+)=([^;]*)/);if(m)cookies.set(m[1].trim(),m[2].trim())}}
function ch(){return [...cookies.entries()].map(([k,v])=>`${k}=${v}`).join('; ')}
const csrfR=await fetch(`${BASE}/api/auth/csrf`,{cache:'no-store'});setC(csrfR)
const {csrfToken}=await csrfR.json()
await fetch(`${BASE}/api/auth/callback/credentials`,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded',cookie:ch()},body:new URLSearchParams({csrfToken,email:'admin@daar.nl',password:'daar2024!',callbackUrl:`${BASE}/admin`,json:'true'}),redirect:'manual'})
setC
const p=await fetch(`${BASE}/admin/lead-machine`,{headers:{cookie:ch()}})
const html=await p.text()
console.log('PAGE status:',p.status)
console.log('has title "Lead Machine":', html.includes('Lead Machine'))
console.log('has "Zoekopdracht":', html.includes('Zoekopdracht'))
console.log('redirect to login?', p.status===302 || html.includes('/admin/login'))
