import{i as m,S as f}from"./assets/vendor-9310f15c.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}})();const l=document.querySelector(".img-form"),d=document.querySelector(".img-inp"),g=document.querySelector(".img-btn"),y=document.querySelector(".loader"),c=document.querySelector(".gallery"),h="https://pixabay.com/api/",p="41930626-f2ac102ea6260ef01eb19ab27";l.addEventListener("submit",n=>{n.preventDefault();const o=d.value.trim();if(c.innerHTML="",!o){t("The search field can't be empty! Please, enter your request!");return}const i=`${h}?key=${p}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true`;function s(e){return a(!0),fetch(e).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()})}function t(e){m.show({message:e,messageColor:"#FAFAFB",messageSize:"16px",position:"topRight",backgroundColor:"#EF4040",close:!1,closeOnClick:!0,class:"error-svg",icon:"error-svg",maxWidth:"432",maxHeight:"88"})}s(i).then(e=>{e.hits.length===0&&(t("Sorry, there are no images matching your search query. Please, try again!"),a(!1)),c.innerHTML=b(e.hits),a(!1),new f(".gallery-item a",{captionsData:"alt",captionDelay:250}),l.reset()}).catch(e=>console.error(e))});function b(n){return n.map(({webformatURL:o,largeImageURL:i,tags:s,likes:t,views:e,comments:r,downloads:u})=>`
<li class="gallery-item">
  <a class="gallery-link" href="${i}">
    <img class="gallery-image" src="${o}" alt="${s}" />
    <p class="gallery-item">Likes: ${t} Views: ${e} Comments: ${r} Downloads: ${u}</p>
  </a>
</li>`).join("")}function a(n=!0){y.style.display=n?"inline-block":"none",g.disabled=n}
//# sourceMappingURL=commonHelpers.js.map