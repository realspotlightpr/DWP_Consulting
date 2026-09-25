import {readFileSync,existsSync,statSync,mkdirSync,cpSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
for(const file of ['index.html','library/index.html']){
 const html=readFileSync(file,'utf8');
 for(const [,url] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)){
  const path=url.split('#')[0];
  const local=resolve('.'+path+(path.endsWith('/')?'index.html':''));
  assert(existsSync(local),`${file}: missing ${url}`);
 }
 assert(html.includes('name="viewport"'),`${file}: missing viewport`);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: expected one H1`);
}
for(const f of ['assets/logo.png','assets/hero.mp4','assets/hero-poster.jpg']) assert(statSync(f).size>1000,`Invalid asset ${f}`);
console.log('PASS: both routes, local assets, metadata, headings and media validated.');

mkdirSync("dist",{recursive:true});
for(const file of ["index.html","library","assets","styles.css","app.js","config.js"]) cpSync(file,"dist/"+file,{recursive:true});
console.log("Production files copied to dist.");
