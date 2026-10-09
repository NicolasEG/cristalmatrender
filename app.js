const current=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('nav a').forEach(a=>{if(a.getAttribute('href')===current){a.classList.add('active');a.setAttribute('aria-current','page')}});
document.querySelector('.menu-toggle')?.addEventListener('click',e=>{const open=document.querySelector('nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(open))});
document.querySelector('#consulta')?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);const message=`Hola CRISTALMAT, soy ${d.get('nombre')}. Me interesa ${d.get('servicio')}. Localidad: ${d.get('localidad')}. ${d.get('mensaje')}`;window.open('https://wa.me/5491157467538?text='+encodeURIComponent(message),'_blank','noopener,noreferrer')});
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets=document.querySelectorAll('.hero-inner > *, .hero-bottom > *, .family-card, .steps-grid > *, .page-top .wrap > *, .split > *, .solutions-heading .eyebrow, .kinetic-title > span, .solutions-body > *, .quality-line > *, .delivery-tag, .heading-row > *, .product, .rombo-feature, .material-card, .line-list > div, .parallax .wrap > *, .carousel-shell, .service, .faq > *, .contact-grid > *, .contact-item, .cta .wrap > *, .footer-grid > *');
if('IntersectionObserver' in window && !reducedMotion.matches){
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:0.08,rootMargin:'0px 0px -25px 0px'});
 revealTargets.forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--reveal-delay',`${(i%3)*70}ms`);observer.observe(el)});
 reducedMotion.addEventListener('change',e=>{if(e.matches){revealTargets.forEach(el=>el.classList.add('is-visible'));observer.disconnect()}});
}
document.querySelector('.carousel-toggle')?.addEventListener('click',e=>{const shell=e.currentTarget.closest('.carousel-shell');const paused=shell.classList.toggle('paused');e.currentTarget.setAttribute('aria-pressed',String(paused));e.currentTarget.textContent=paused?'Reanudar carrusel':'Pausar carrusel'});
const photoDialog=document.createElement('dialog');
photoDialog.className='photo-modal';photoDialog.setAttribute('aria-label','Vista ampliada de imagen');
photoDialog.innerHTML='<button class="photo-close" type="button" aria-label="Cerrar imagen ampliada">Cerrar ×</button><img alt=""><p class="photo-caption"></p>';
document.body.append(photoDialog);
let photoTrigger;
const closePhoto=()=>photoDialog.close();
photoDialog.querySelector('.photo-close').addEventListener('click',closePhoto);
photoDialog.addEventListener('click',e=>{if(e.target===photoDialog)closePhoto()});
photoDialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');document.querySelector('.carousel-shell')?.classList.remove('modal-paused');photoTrigger?.focus({preventScroll:true})});
document.querySelectorAll('.carousel-group:not([aria-hidden]) img, .service-photo img, .product-image img, .intro-photo').forEach(img=>{
 const button=document.createElement('button');button.type='button';button.className='photo-trigger';button.setAttribute('aria-label','Ampliar: '+img.alt);button.setAttribute('aria-haspopup','dialog');
 img.replaceWith(button);button.append(img);
 button.addEventListener('click',()=>{photoTrigger=button;photoDialog.querySelector('img').src=img.src;photoDialog.querySelector('img').alt=img.alt;photoDialog.querySelector('.photo-caption').textContent=img.alt;document.body.classList.add('modal-open');document.querySelector('.carousel-shell')?.classList.add('modal-paused');photoDialog.showModal()});
});
document.querySelectorAll('.carousel-group[aria-hidden] img').forEach((img,i)=>{img.addEventListener('click',()=>document.querySelectorAll('.carousel-group:not([aria-hidden]) .photo-trigger')[i]?.click());img.style.cursor='zoom-in'});
document.querySelectorAll('[data-photo-src]').forEach(button=>button.addEventListener('click',()=>{
 photoTrigger=button;photoDialog.querySelector('img').src=button.dataset.photoSrc;
 photoDialog.querySelector('img').alt=button.dataset.photoCaption;
 photoDialog.querySelector('.photo-caption').textContent=button.dataset.photoCaption;
 document.body.classList.add('modal-open');photoDialog.showModal();
}));

const modelSelect=document.querySelector('#model-select');
if(modelSelect){
 const models=[
  {name:'ROMBO',measures:'40 × 40 × 9',weight:'20,5',quantity:'6,3',price:'26.500',piece:'rombo-producto.png',description:'La geometría del hormigón, integrada a tus exteriores.',works:['rombo-colocado-original-v2.png'],pattern:'rombo-patron.png'},
  {name:'Loseta cribada 7 cm',measures:'40 × 40 × 7',weight:'12',quantity:'7',price:'29.500',piece:'cribada-7-producto.png',description:'Una trama abierta para integrar hormigón y espacios verdes.',reinforced:true,works:['cribada-7-obra-1.png','cribada-7-obra-2.png']},
  {name:'Loseta cribada 6 cm',measures:'60 × 40 × 6',weight:'18',quantity:'4',price:'24.200',piece:'cribada-6-producto.png',description:'Formato rectangular para tus patios y accesos.',reinforced:true,works:['cribada-6-obra-1.png','cribada-6-obra-2.png']},
  {name:'Adoquín Holanda 8 cm',measures:'20 × 10 × 8',weight:'3,5',quantity:'50',price:'26.365',piece:'holanda-8-producto.png',description:'Líneas simples y distintos patrones de colocación.',works:['holanda-obra.png'],pattern:'holanda-patrones.png'},
  {name:'Adoquín Holanda 6 cm',measures:'20 × 10 × 6',weight:'2,6',quantity:'50',price:'23.550',piece:'holanda-6-producto.png',description:'El diseño clásico del adoquín, para darle forma a tu espacio.',works:['holanda-obra.png'],pattern:'holanda-patrones.png'}
 ];
 let selectedModel=0,selectedImage=0;
 const image=document.querySelector('#model-image'),mainButton=document.querySelector('.model-main-image'),thumbs=document.querySelector('.model-thumbs');
 const imageList=()=>{const m=models[selectedModel];return [{file:m.piece,type:'piece',caption:`Pieza de hormigón · ${m.name}`},...m.works.map((file,i)=>({file,type:'works',caption:`${m.name} · Obra finalizada${m.works.length>1?' '+(i+1):''}`})),...(m.pattern?[{file:m.pattern,type:'pattern',caption:`${m.name} · Patrón de colocación`}]:[])]};
 function showImage(index){
  const list=imageList();selectedImage=(index+list.length)%list.length;const chosen=list[selectedImage];
  image.src='assets/'+chosen.file;image.alt=chosen.caption;
  if(!reducedMotion.matches)image.animate([{opacity:.25},{opacity:1}],{duration:300,easing:'ease-out'});
  image.classList.toggle('model-photo',chosen.type==='works');image.classList.toggle('rombo-corrected',chosen.file==='rombo-colocado-original-v2.png');
  mainButton.setAttribute('aria-label','Ampliar: '+chosen.caption);
  document.querySelector('#model-caption').textContent=chosen.caption;
  thumbs.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selectedImage)));
  document.querySelectorAll('[data-model-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.modelView===chosen.type)));
 }
 function chooseModel(index){
  selectedModel=(index+models.length)%models.length;const m=models[selectedModel];modelSelect.value=String(selectedModel);
  document.querySelectorAll('[data-model]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.model)===selectedModel)));
  for(const [key,value] of Object.entries({name:m.name,measures:m.measures,weight:m.weight,quantity:m.quantity,price:'$'+m.price,description:m.description}))document.querySelector('#model-'+key).textContent=value;
  document.querySelector('#model-badge').textContent='PREMOLDEADOS · '+m.name;
  document.querySelector('#model-reinforcement').hidden=!m.reinforced;
  document.querySelector('[data-model-view="pattern"]').hidden=!m.pattern;
  const quote=document.querySelector('#model-quote');quote.textContent='Cotizar '+m.name;quote.href='https://wa.me/5491157467538?text='+encodeURIComponent(`Hola CRISTALMAT, quiero cotizar ${m.name}, medidas ${m.measures} cm.`);
  document.querySelector('#model-counter').textContent=`${selectedModel+1} / ${models.length}`;
  thumbs.replaceChildren();imageList().forEach((entry,i)=>{const b=document.createElement('button'),img=document.createElement('img');b.type='button';b.setAttribute('aria-label',entry.caption);b.setAttribute('aria-pressed',String(i===0));img.src='assets/'+entry.file;img.alt='';b.append(img);b.addEventListener('click',()=>showImage(i));thumbs.append(b)});
  showImage(0);
 }
 modelSelect.addEventListener('change',()=>chooseModel(Number(modelSelect.value)));
 document.querySelectorAll('[data-model]').forEach(b=>b.addEventListener('click',()=>chooseModel(Number(b.dataset.model))));
 const mobileScroll=target=>{if(window.matchMedia('(max-width:650px)').matches)target.scrollIntoView({block:'center',behavior:reducedMotion.matches?'instant':'smooth'})};
 document.querySelectorAll('[data-model-view]').forEach(b=>b.addEventListener('click',()=>{const index=imageList().findIndex(entry=>entry.type===b.dataset.modelView);if(index>=0){showImage(index);mobileScroll(mainButton)}}));
 document.querySelector('#model-prev').addEventListener('click',()=>{chooseModel(selectedModel-1);mobileScroll(modelSelect)});
 document.querySelector('#model-next').addEventListener('click',()=>{chooseModel(selectedModel+1);mobileScroll(modelSelect)});
 mainButton.addEventListener('click',()=>{photoTrigger=mainButton;photoDialog.querySelector('img').src=image.src;photoDialog.querySelector('img').alt=image.alt;photoDialog.querySelector('.photo-caption').textContent=image.alt;document.body.classList.add('modal-open');photoDialog.showModal()});
 mainButton.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();showImage(selectedImage+(e.key==='ArrowRight'?1:-1))}});
 chooseModel(0);
}
