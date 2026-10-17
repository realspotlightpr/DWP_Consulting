import {readFileSync,existsSync,statSync,mkdirSync,cpSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
for(const file of ['index.html','services/index.html','difference/index.html','library/index.html','library/when-wealth-outgrows-the-plan/index.html','library/estate-plan-alignment/index.html','library/w2-tax-planning-questions/index.html','contact/index.html','contact/thanks/index.html','privacy/index.html','terms/index.html','disclosures/index.html']){
 const html=readFileSync(file,'utf8');
 for(const [,url] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)){
  const path=url.split('#')[0];
  const local=resolve('.'+path+(path.endsWith('/')?'index.html':''));
  assert(existsSync(local),`${file}: missing ${url}`);
 }
 assert(html.includes('name="viewport"'),`${file}: missing viewport`);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: expected one H1`);
 if(!file.includes('contact/thanks/')) assert(html.includes('rel="canonical"'),`${file}: missing canonical`);
}
for(const f of ['assets/logo.png','assets/logo-transparent.png','assets/founder-gary-kauffman.png','assets/dwp-team-group.jpeg','assets/difference-hero-v2.png','assets/difference-hero-gary-julia.png','assets/gary-kauffman-character-sheet-v1.png','assets/services-hero-gary-physician.png','assets/services-hero-gary-physician-v2.png','assets/services-hero-gary-physician-v3.png','assets/hero.mp4','assets/hero-poster.jpg']) assert(statSync(f).size>1000,`Invalid asset ${f}`);
console.log('PASS: all routes, local assets, metadata, headings and media validated.');

mkdirSync("dist",{recursive:true});
for(const file of ["index.html","services","difference","library","contact","privacy","terms","disclosures","assets","robots.txt","sitemap.xml","styles.css","app.js","difference.js","contact.js","config.js"]) cpSync(file,"dist/"+file,{recursive:true});
console.log("Production files copied to dist.");
