(function(){
  // Real LeetCode submission calendar for Vicky30805 (snapshot taken 28 Sep 2026)
  var CAL=window.LEETCODE_ACTIVITY.calendar; var STREAK=window.LEETCODE_ACTIVITY.streak, DAY=window.LEETCODE_ACTIVITY.daySeconds;
  var MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var keys=Object.keys(CAL).map(Number).sort(function(a,b){return a-b});
  var first=keys[0], last=keys[keys.length-1];
  var start=first-new Date(first*1000).getUTCDay()*DAY;
  var cells=document.getElementById("cells"), months=document.getElementById("months");
  var total=0, lastMonth=-1, i=0;
  for(var t=start;t<=last;t+=DAY,i++){
    var w=Math.floor(i/7), d=i%7, n=CAL[t]||0;
    total+=n;
    var c=document.createElement("i");
    c.className=n===0?"":n===1?"l1":n<5?"l2":n<10?"l3":"l4";
    c.style.setProperty("--w",w);
    c.title=(n===0?"No submissions":n+(n===1?" submission":" submissions"))+" on "+new Date(t*1000).toUTCString().slice(0,16);
    cells.appendChild(c);
    if(d===0){
      var m=new Date(t*1000).getUTCMonth();
      if(m!==lastMonth){
        var s=document.createElement("span");
        s.textContent=MON[m];
        s.style.gridColumn=(w+1);
        months.appendChild(s);
        lastMonth=m;
      }
    }
  }
  document.getElementById("heat-sum").innerHTML="<b>"+total+"</b> submissions on <b>"+keys.length+"</b> active days since April 2026. Current streak: <b>"+STREAK+" days</b>.";
})();
