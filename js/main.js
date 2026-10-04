(function(){
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll progress bar
  var prog=document.getElementById("prog");
  function onScroll(){
    var h=document.documentElement.scrollHeight-window.innerHeight;
    prog.style.transform="scaleX("+(h>0?window.scrollY/h:0)+")";
  }
  window.addEventListener("scroll",onScroll,{passive:true});
  onScroll();

  // Typing line
  var typed=document.getElementById("typed");
  var words=["building web apps","training ML models","solving DSA problems","competing in hackathons"];
  if(!reduce){
    var wi=0,ci=words[0].length,del=false;
    (function tick(){
      var w=words[wi];
      typed.textContent=w.slice(0,ci);
      if(!del&&ci===w.length){del=true;return setTimeout(tick,1700);}
      if(del&&ci===0){del=false;wi=(wi+1)%words.length;}
      ci+=del?-1:1;
      setTimeout(tick,del?28:65);
    })();
  }

  // Scroll reveal
  var items=document.querySelectorAll(".stat,.proj,.row,ul.plain li,.about p,.heat,.lc h3");
  if(!reduce&&"IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});
    },{threshold:.12});
    items.forEach(function(el){
      var idx=Array.prototype.indexOf.call(el.parentNode.children,el);
      el.style.transitionDelay=(idx%4)*70+"ms";
      el.classList.add("rv");
      io.observe(el);
    });
  }

  // Count-up numbers
  document.querySelectorAll(".stat b").forEach(function(b){
    var m=b.textContent.match(/^(\D*)(\d+)(\D*)$/);
    if(!m||reduce||!("IntersectionObserver" in window))return;
    var pre=m[1],to=+m[2],suf=m[3];
    b.textContent=pre+"0"+suf;
    var co=new IntersectionObserver(function(es){
      if(!es[0].isIntersecting)return;
      co.disconnect();
      var start=null;
      function step(t){
        if(!start)start=t;
        var p=Math.min((t-start)/1300,1);
        b.textContent=pre+Math.round(to*(1-Math.pow(1-p,3)))+suf;
        if(p<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    },{threshold:.5});
    co.observe(b);
  });

  // Cursor glow on the LeetCode panel
  var lc=document.querySelector(".lc");
  lc.addEventListener("mousemove",function(e){
    var r=lc.getBoundingClientRect();
    lc.style.setProperty("--mx",(e.clientX-r.left)+"px");
    lc.style.setProperty("--my",(e.clientY-r.top)+"px");
  });

  // Highlight the nav link of the section in view
  var links={};
  document.querySelectorAll("nav a").forEach(function(a){links[a.getAttribute("href").slice(1)]=a;});
  if("IntersectionObserver" in window){
    var so=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(!e.isIntersecting)return;
        Object.keys(links).forEach(function(k){links[k].removeAttribute("aria-current");});
        links[e.target.id].setAttribute("aria-current","true");
      });
    },{rootMargin:"-40% 0px -55% 0px"});
    Object.keys(links).forEach(function(id){var s=document.getElementById(id);if(s)so.observe(s);});
  }
})();
