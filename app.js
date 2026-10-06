const current=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('nav a').forEach(a=>{if(a.getAttribute('href')===current){a.classList.add('active');a.setAttribute('aria-current','page')}});
document.querySelector('.menu-toggle')?.addEventListener('click',e=>{const open=document.querySelector('nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(open))});
document.querySelector('#consulta')?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);const message=`Hola CRISTALMAT, soy ${d.get('nombre')}. Me interesa ${d.get('servicio')}. Localidad: ${d.get('localidad')}. ${d.get('mensaje')}`;window.open('https://wa.me/5491157467538?text='+encodeURIComponent(message),'_blank','noopener,noreferrer')});
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets=document.querySelectorAll('.hero-inner > *, .page-top .wrap > *, .split > *, .heading-row > *, .product, .line-list > div, .parallax .wrap > *, .carousel-shell, .service, .faq > *, .contact-grid > *, .contact-item, .cta .wrap > *, .footer-grid > *');
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
