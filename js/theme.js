(function(){
  var root=document.documentElement, btn=document.getElementById("theme"), label=document.getElementById("tlabel");
  var mq=window.matchMedia("(prefers-color-scheme: dark)");
  function current(){var t=root.getAttribute("data-theme");return t||(mq.matches?"dark":"light");}
  function show(){label.textContent=current()==="dark"?"Dark":"Light";}
  try{var saved=localStorage.getItem("theme");if(saved==="dark"||saved==="light")root.setAttribute("data-theme",saved);}catch(e){}
  show();
  btn.addEventListener("click",function(){
    var next=current()==="dark"?"light":"dark";
    root.setAttribute("data-theme",next);
    try{localStorage.setItem("theme",next);}catch(e){}
    show();
  });
})();
