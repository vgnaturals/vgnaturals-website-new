/**
 * VG Naturals catalogue generator.
 * Canonical source: data/products.ts (no copied prices in brochure assets).
 * Run: npm run prebuild / node scripts/generate-catalogue.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root=process.cwd(),pub=path.join(root,"public"),dir=path.join(pub,"catalogue");
fs.mkdirSync(dir,{recursive:true});
const source=fs.readFileSync(path.join(root,"data/products.ts"),"utf8");
const marker="export const products: Product[] = [";
const start=source.indexOf(marker);
if(start<0)throw Error("Missing products array");
const end=source.indexOf("\n];",start);
if(end<0)throw Error("Missing products array terminator");
const products=JSON.parse(source.slice(start+marker.length-1,end+2));
const groups=[
 {key:"lemongrass",label:"The Lemongrass Collection",species:"Cymbopogon flexuosus",photo:"catalogue-assets/lemongrass-essential-oil-bottles.jpg",out:"lemongrass-products-price-catalogue.svg"},
 {key:"tulsi",label:"The Tulsi Collection",species:"Ocimum sanctum",photo:"catalogue-assets/tulsi-essential-oil-ocimum-sanctum.jpg",out:"tulsi-ocimum-sanctum-products-price-catalogue.svg"},
 {key:"basil",label:"The Sweet Basil Collection",species:"Ocimum basilicum",photo:"catalogue-assets/basil-essential-oil-ocimum-basilicum.jpg",out:"basil-ocimum-basilicum-products-price-catalogue.svg"}
];
const included=products.filter(p=>p.status==="ready"||p.status==="fresh");
const byKey=k=>included.filter(p=>p.slug.startsWith(k+"-")||(k==="tulsi"&&["herbal-tulsi-tea-pouch","fresh-tulsi-leaves"].includes(p.slug))||(k==="basil"&&p.slug==="fresh-basil-leaves"));
const expected=groups.reduce((sum,g)=>sum+byKey(g.key).length,0);
if(expected!==13||included.length!==13)throw Error("Expected 13 product catalogue items; found "+expected+" of "+included.length);
const seen=new Set();
for(const p of included){
 if(seen.has(p.slug))throw Error("Duplicate "+p.slug);
 seen.add(p.slug);
 if(!p.variants.length)throw Error("Missing variants: "+p.slug);
 for(const v of p.variants)if(!(Number.isFinite(v.price)&&v.price>0))throw Error("Invalid price: "+p.slug);
}
const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const readData=(filename)=>{const p=path.join(pub,filename);if(!fs.existsSync(p))return "";const ext=path.extname(p).toLowerCase();const mime=ext===".jpg"||ext===".jpeg"?"image/jpeg":ext===".png"?"image/png":"";return mime?"data:"+mime+";base64,"+fs.readFileSync(p).toString("base64"):"";};
const imageNode=(filename,x,y,w,h)=>{const src=readData(filename);return src?'<image href="'+src+'" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" preserveAspectRatio="xMidYMid slice"/>':"";};
const logo=()=>imageNode("catalogue-assets/vg-naturals-leaf-gold-logo.png",60,55,96,96);
const svgHead=()=>'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1055" height="1491" viewBox="0 0 1055 1491">';
const style='<style>text{font-family:Arial,Helvetica,sans-serif}.minor{font-size:25px;letter-spacing:2px;fill:#ad9b62}.head{font-size:67px;font-weight:700;fill:#fffaf0}.sub{font-size:29px;fill:#e5e8d7}.label{font-size:34px;font-weight:700;fill:#173c2a}.detail{font-size:22px;fill:#536a59}.price{font-size:28px;font-weight:700;fill:#173c2a}.note{font-size:21px;fill:#4c6155}</style>';
const footer=(page,reverse=false)=>'<rect y="1412" width="1055" height="79" fill="'+(reverse?"#173d2e":"#e7e9dd")+'"/><text x="64" y="1459" font-size="22" fill="'+(reverse?"#f8f3de":"#1d442f")+'">VG NATURALS PRIVATE LIMITED  |  www.vgnaturals.com</text><text x="962" y="1459" text-anchor="end" font-size="20" fill="'+(reverse?"#f8f3de":"#1d442f")+'">0'+page+' / 05</text>';
const cover=()=>svgHead()+style+'<rect width="1055" height="1491" fill="#173e2e"/><rect x="54" y="40" width="947" height="1410" rx="17" stroke="#b99d5d" stroke-width="2" fill="none"/>'+logo()+'<text x="174" y="96" font-size="31" font-weight="700" fill="#fdf6dd">VG NATURALS</text><text x="174" y="130" font-size="19" fill="#d6c58c">Pure • Natural • Organic Care</text><text x="68" y="295" class="minor">2026 | PRODUCT CATALOGUE</text><text x="67" y="385" class="head">FROM OUR FARM</text><text x="67" y="460" class="head">TO YOUR PRODUCT</text><text x="70" y="526" class="sub">Essential Oils  •  Hydrosols  •  Herbal Teas</text><defs><clipPath id="cv"><rect x="70" y="575" width="915" height="500" rx="20"/></clipPath></defs><g clip-path="url(#cv)">'+imageNode("catalogue-assets/botanical-farm-field-landscape.jpg",70,575,915,500)+'</g><rect x="70" y="1132" width="915" height="202" rx="18" fill="#24573c"/><text x="107" y="1190" font-size="37" font-weight="700" fill="#fff4d6">Lemongrass  ·  Tulsi  ·  Sweet Basil</text><text x="107" y="1242" font-size="26" fill="#e7eddf">Farm-linked botanical products from Lucknow, India</text><text x="107" y="1287" font-size="23" fill="#d7e0ce">Current retail packs • Bulk quotations on enquiry</text>'+footer(1,true)+'</svg>';
function groupSVG(g,page){
 const rows=byKey(g.key);let content=svgHead()+style+'<rect width="1055" height="1491" fill="#fbfaf4"/><rect width="1055" height="313" fill="#173e2e"/>'+logo()+'<text x="178" y="98" font-size="31" font-weight="700" fill="#fff4d6">VG NATURALS</text><text x="178" y="130" font-size="19" fill="#d6c58c">From Our Farm to Your Product</text><text x="64" y="229" font-size="58" font-weight="700" fill="#fffaf0">'+esc(g.label)+'</text><text x="66" y="282" font-size="27" font-style="italic" fill="#e0e9d9">'+esc(g.species)+'</text>';
 content+='<defs><clipPath id="photo'+page+'"><rect x="784" y="48" width="206" height="153" rx="12"/></clipPath></defs><g clip-path="url(#photo'+page+')">'+imageNode(g.photo,784,48,206,153)+'</g>';
 content+='<text x="66" y="368" class="minor">CURRENT RETAIL PACK PRICES  |  EFFECTIVE 02 NOV 2026</text>';
 rows.forEach((p,i)=>{
   const y=410+i*174;
   const priced=p.variants.map(v=>v.label+' : ₹'+v.price).join('   |   ');
   content+='<rect x="64" y="'+y+'" width="927" height="152" rx="15" fill="'+(i%2?"#eef2e9":"#f4f1e7")+'" stroke="#d9e2d6"/>';
   content+='<text x="86" y="'+(y+48)+'" class="label">'+esc(p.name)+'</text>';
   content+='<text x="86" y="'+(y+84)+'" class="detail">'+esc(p.botanicalName||g.species)+'  •  '+esc(p.category)+'</text>';
   content+='<text x="86" y="'+(y+125)+'" class="price">'+esc(priced)+'</text>';
   if(p.status==="fresh")content+='<text x="952" y="'+(y+126)+'" text-anchor="end" font-size="18" font-weight="700" fill="#a36513">CHECK AVAILABILITY</text>';
 });
 const bottom=410+rows.length*174+34;
 content+='<text x="66" y="'+bottom+'" class="note">Fresh leaves: harvest and delivery availability must be confirmed.</text>';
 content+='<text x="66" y="'+(bottom+36)+'" class="note">Packaging, courier and applicable GST are additional where applicable.</text>';
 content+='<text x="66" y="'+(bottom+72)+'" class="note">Bulk price, MOQ, specifications and delivery terms: confirmed on enquiry.</text>';
 content+=footer(page)+'</svg>';return content;
}
function finalSVG(){
 return svgHead()+style+'<rect width="1055" height="1491" fill="#173e2e"/>'+logo()+'<text x="172" y="105" font-size="39" font-weight="700" fill="#fff7dd">VG NATURALS</text><text x="69" y="272" class="minor">FOR MANUFACTURERS, FORMULATORS &amp; BUYERS</text><text x="66" y="362" class="head">BULK ENQUIRIES</text><text x="66" y="439" class="head">&amp; CONTACT</text><text x="68" y="500" class="sub">From cultivation and extraction to product supply</text><defs><clipPath id="finalphoto"><rect x="67" y="554" width="923" height="347" rx="16"/></clipPath></defs><g clip-path="url(#finalphoto)">'+imageNode("catalogue-assets/botanical-farm-field-landscape.jpg",67,554,923,347)+'</g><rect x="68" y="948" width="923" height="330" rx="19" fill="#f8f6eb"/><text x="112" y="1010" font-size="33" font-weight="700" fill="#1b432f">VG NATURALS PRIVATE LIMITED</text><text x="112" y="1068" font-size="27" fill="#1e4731">Phone / WhatsApp: +91 90442 10088</text><text x="112" y="1117" font-size="27" fill="#1e4731">Email: vgnaturalspvtltd@gmail.com</text><text x="112" y="1166" font-size="27" fill="#1e4731">Website: www.vgnaturals.com</text><text x="112" y="1215" font-size="24" fill="#5b675b">Lucknow, Uttar Pradesh, India</text><text x="68" y="1340" font-size="23" fill="#e7ebdf">Share product, quantity, application and delivery PIN for a B2B quote.</text>'+footer(5,true)+'</svg>';
}
const svgAssets=[
 ["vg-naturals-botanical-product-catalogue-cover.svg",cover()],
 ...groups.map((g,i)=>[g.out,groupSVG(g,i+2)]),
 ["vg-naturals-b2b-bulk-supply-contact.svg",finalSVG()]
];
for(const [name,content] of svgAssets)fs.writeFileSync(path.join(dir,name),content,"utf8");
const ascii=s=>String(s).normalize("NFKD").replace(/[^\x20-\x7e]/g," ").replace(/\s+/g," ").trim();
const pEsc=s=>ascii(s).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)");
const objects=[null];
const obj=content=>(objects.push(Buffer.isBuffer(content)?content:Buffer.from(content,"binary")),objects.length-1);
const set=(id,content)=>objects[id]=Buffer.isBuffer(content)?content:Buffer.from(content,"binary");
const stream=b=>{const data=Buffer.isBuffer(b)?b:Buffer.from(b,"binary");return Buffer.concat([Buffer.from("<< /Length "+data.length+" >>\nstream\n"),data,Buffer.from("\nendstream")]);};
const fontRegular=obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
const fontBold=obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
const pagesId=obj("");
const catalogId=obj("<< /Type /Catalog /Pages "+pagesId+" 0 R >>");
const imageDefs={};
function jpegDim(bytes){let i=2;if(bytes[0]!==255||bytes[1]!==216)return null;while(i+9<bytes.length){if(bytes[i]!==255){i++;continue;}while(bytes[i]===255)i++;const marker=bytes[i++];if(marker===217||marker===218)break;const n=bytes.readUInt16BE(i);if([192,193,194,195,198,199].includes(marker))return {h:bytes.readUInt16BE(i+3),w:bytes.readUInt16BE(i+5)};i+=n;}return null;}
for(const key of ["cover",...groups.map(g=>g.key),"contact"]){
 const p=path.join(pub,key==="cover"||key==="contact"?"catalogue-assets/botanical-farm-field-landscape.jpg":groups.find(g=>g.key===key).photo);
 if(!fs.existsSync(p))continue;
 const bytes=fs.readFileSync(p),d=jpegDim(bytes);if(!d)continue;
 const hdr=Buffer.from("<< /Type /XObject /Subtype /Image /Width "+d.w+" /Height "+d.h+" /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length "+bytes.length+" >>\nstream\n");
 imageDefs[key]={id:obj(Buffer.concat([hdr,bytes,Buffer.from("\nendstream")])),w:d.w,h:d.h};
}
const W=595,H=842;
function painter(key){
 const cmd=[];const put=(s)=>cmd.push(s);
 const rect=(x,y,w,h,color)=>put(color+" rg "+x+" "+y+" "+w+" "+h+" re f");
 const text=(x,y,s,size=12,bold=false,color="0.12 0.25 0.18")=>put("BT "+color+" rg /"+(bold?"F2":"F1")+" "+size+" Tf "+x+" "+y+" Td ("+pEsc(s)+") Tj ET");
 const img=(x,y,w,h)=>{if(imageDefs[key])put("q "+w+" 0 0 "+h+" "+x+" "+y+" cm /Im Do Q")};
 return {cmd,rect,text,img};
}
const pageIds=[];
function pushPage(content,key){
 const cId=obj(stream(content.cmd.join("\n")));
 const xobj=imageDefs[key]?"/XObject << /Im "+imageDefs[key].id+" 0 R >>":"";
 const pId=obj("<< /Type /Page /Parent "+pagesId+" 0 R /MediaBox [0 0 "+W+" "+H+"] /Resources << /Font << /F1 "+fontRegular+" 0 R /F2 "+fontBold+" 0 R >> "+xobj+" >> /Contents "+cId+" 0 R >>");
 pageIds.push(pId);
}
function basePage(p,key,title,kicker){
 p.rect(0,0,W,H,"0.985 0.983 0.957");p.rect(0,675,W,167,"0.095 0.235 0.174");
 p.text(42,800,"VG NATURALS PRIVATE LIMITED",17,true,"0.97 0.93 0.82");
 p.text(42,775,"From Our Farm to Your Product",11,false,"0.83 0.79 0.57");
 p.text(42,724,title,28,true,"1 0.99 0.93");
 p.text(43,692,kicker,11,false,"0.84 0.88 0.79");
 p.rect(0,0,W,45,"0.88 0.91 0.86");
 p.text(43,20,"www.vgnaturals.com | Phone +91 90442 10088",10,false);
}
{
 const p=painter("cover");p.rect(0,0,W,H,"0.09 0.23 0.17");
 p.text(46,785,"VG NATURALS PRIVATE LIMITED",20,true,"0.97 0.94 0.79");
 p.text(46,740,"2026 PRODUCT CATALOGUE",11,false,"0.83 0.79 0.57");
 p.text(46,655,"FROM OUR FARM",32,true,"1 0.99 0.94");
 p.text(46,611,"TO YOUR PRODUCT",32,true,"1 0.99 0.94");
 p.text(46,573,"Essential Oils  |  Hydrosols  |  Herbal Teas",15,false,"0.90 0.93 0.86");
 p.img(45,236,505,290);
 p.rect(46,116,503,92,"0.14 0.34 0.24");
 p.text(66,173,"Lemongrass | Tulsi | Sweet Basil",18,true,"1 0.96 0.85");
 p.text(66,141,"Current retail packs | Bulk supply on enquiry",11,false,"0.87 0.90 0.84");
 p.text(46,55,"Lucknow, Uttar Pradesh, India",11,false,"0.87 0.90 0.84");
 pushPage(p,"cover");
}
for(const g of groups){
 const p=painter(g.key);basePage(p,g.key,g.label,g.species+" | CURRENT RETAIL PRICES");
 p.img(435,683,119,110);
 const rows=byKey(g.key);rows.forEach((item,i)=>{
  const y=620-i*107;p.rect(40,y-75,515,92,i%2?"0.945 0.957 0.935":"0.973 0.963 0.927");
  p.text(56,y-3,item.name,15,true);
  p.text(56,y-26,item.botanicalName+" | "+item.category,10);
  const v=item.variants.map(v=>v.label+": INR "+v.price).join("    |    ");
  p.text(56,y-52,v,12,true);
  if(item.status==="fresh")p.text(405,y-52,"CHECK AVAILABILITY",8,true,"0.56 0.32 0.08");
 });
 const noteY=620-rows.length*107-15;
 p.text(43,noteY,"Fresh leaves: confirm harvest and delivery availability.",10);
 p.text(43,noteY-18,"Packaging and courier additional; applicable taxes as confirmed.",10);
 p.text(43,noteY-36,"Bulk MOQ, specifications and quotations on enquiry.",10);
 pushPage(p,g.key);
}
{
 const p=painter("contact");basePage(p,"contact","B2B & Bulk Enquiries","ESSENTIAL OILS | HYDROSOLS | BOTANICALS");
 p.img(43,386,509,255);
 p.rect(43,178,509,180,"0.92 0.94 0.89");
 p.text(60,318,"CONTACT VG NATURALS",20,true);
 p.text(60,282,"Phone / WhatsApp  +91 90442 10088",14);
 p.text(60,252,"Email  vgnaturalspvtltd@gmail.com",13);
 p.text(60,222,"Website  www.vgnaturals.com",14);
 p.text(60,192,"Lucknow, Uttar Pradesh, India",12);
 p.text(43,147,"For a bulk quote, share:",13,true);
 p.text(43,125,"Product, botanical identity, quantity, use and delivery PIN code.",11);
 p.text(43,88,"Product origin, MOQ, available documents and logistics on enquiry.",10);
 pushPage(p,"contact");
}
set(pagesId,"<< /Type /Pages /Count "+pageIds.length+" /Kids ["+pageIds.map(i=>i+" 0 R").join(" ")+"] >>");
let offset=0, chunks=[];const add=b=>{chunks.push(b);offset+=b.length};
add(Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n","binary"));const offsets=[0];
for(let i=1;i<objects.length;i++){offsets[i]=offset;add(Buffer.from(i+" 0 obj\n"));add(objects[i]);add(Buffer.from("\nendobj\n"));}
const xrefStart=offset;add(Buffer.from("xref\n0 "+objects.length+"\n0000000000 65535 f \n"));
for(let i=1;i<objects.length;i++)add(Buffer.from(String(offsets[i]).padStart(10,"0")+" 00000 n \n"));
add(Buffer.from("trailer\n<< /Size "+objects.length+" /Root "+catalogId+" 0 R >>\nstartxref\n"+xrefStart+"\n%%EOF\n"));
const pdf=Buffer.concat(chunks),pdfPath=path.join(pub,"VG_Naturals_Ready_to_Share_Product_Catalogue.pdf");
fs.writeFileSync(pdfPath,pdf);
const pdfText=pdf.toString("latin1");
for(const g of groups){const svg=svgAssets.find(e=>e[0]===g.out)[1];for(const p of byKey(g.key)){
 if(!svg.includes(esc(p.name)))throw Error("Image missing product "+p.name);
 if(!pdfText.includes(pEsc(p.name)))throw Error("PDF missing product "+p.name);
 for(const v of p.variants){if(!svg.includes("₹"+v.price))throw Error("Image missing price "+p.name+" "+v.price);if(!pdfText.includes("INR "+v.price))throw Error("PDF missing price "+p.name+" "+v.price);}
}}
if(pageIds.length!==5||!pdfText.startsWith("%PDF-1.4")||!pdfText.endsWith("%%EOF\n"))throw Error("PDF structure check failed");
const manifest={generatedOn:"2026-11-02",source:"data/products.ts",currency:"INR",pageCount:5,productCount:included.length,consistent:true,notes:["Ready items: current listed retail packs","Fresh items: availability confirmation required","Bulk quotes: on enquiry","Packaging and courier additional; applicable GST as confirmed"],products:included.map(p=>({slug:p.slug,name:p.name,status:p.status,botanicalName:p.botanicalName,variants:p.variants}))};
fs.writeFileSync(path.join(dir,"catalogue-price-manifest.json"),JSON.stringify(manifest,null,2)+"\n");
console.log("VG Naturals catalogue PASS: "+pageIds.length+" PDF pages, "+svgAssets.length+" SVG images, "+included.length+" products; "+pdf.length+" PDF bytes; prices from data/products.ts");
