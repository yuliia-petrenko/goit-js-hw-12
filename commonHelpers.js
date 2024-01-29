import{S as b,i as M,a as q}from"./assets/vendor-2618a76b.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&d(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}})();const r={form:document.querySelector(".img-form"),inputForm:document.querySelector(".img-inp"),btnForm:document.querySelector(".img-btn"),galleryForm:document.querySelector(".gallery"),loaderForm:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-btn")},v="https://pixabay.com/api/",F="41930626-f2ac102ea6260ef01eb19ab27",y=new b(".gallery-item a",{captionsData:"alt",captionDelay:250}),a="is-hidden",l=1,u="",f=0;r.form.addEventListener("submit",S);async function S(t){if(t.preventDefault(),r.galleryForm.innerHTML="",i(!0),l=1,r.loadMoreBtn.classList.add(a),u=r.form.query.value.trim(),!u){i(!1),m("The search field can't be empty! Please, enter your request!");return}try{const s=await g(u);f=Math.ceil(s.totalHits/40),p(s.hits,r.galleryForm),s.hits.length>0?(r.loadMoreBtn.classList.remove(a),r.loadMoreBtn.addEventListener("click",B)):(r.loadMoreBtn.classList.add(a),m("Sorry, there are no images matching your search query. Please, try again!"))}catch{m("We're sorry, but you've reached the end of search results.")}finally{i(!1),r.form.reset(),l===f&&r.loadMoreBtn.classList.add(a)}}function m(t){M.show({class:"error-svg",position:"topRight",icon:"error-svg",message:t,maxWidth:"432",messageColor:"#fff",messageSize:"16px",backgroundColor:"#EF4040",close:!1,closeOnClick:!0})}async function B(){l+=1;try{i(!0),r.loadMoreBtn.classList.add(a);const{hits:t}=await g(u,l);p(t),y.refresh(),r.loadMoreBtn.classList.remove1(a)}catch{m("We're sorry, but you've reached the end of search results.")}finally{i(!1),l===f&&r.loadMoreBtn.classList.add(a)}}async function g(t,s=1){return(await q.get(`${v}`,{params:{key:F,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:s}})).data}function p(t){const s=t.map(({webformatURL:c,largeImageURL:d,tags:e,likes:o,views:n,comments:h,downloads:L})=>`
       <li class="gallery-item">
  <a class="gallery-link" href="${d}">
    <img class="gallery-image" src="${c}" alt="${e}" />
    <p class="gallery-item">Likes: ${o} Views: ${n} Comments: ${h} Downloads: ${L}</p>
  </a>
</li>`).join("");r.galleryForm.insertAdjacentHTML("beforeend",s),y.refresh()}function i(t=!0){r.loaderForm.style.display=t?"inline-block":"none",r.btnForm.disabled=t}
//# sourceMappingURL=commonHelpers.js.map
