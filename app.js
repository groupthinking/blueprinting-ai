
(function(){
  var nav=document.getElementById('nav'),b=document.getElementById('burger'),m=document.getElementById('menu');
  b.addEventListener('click',function(){var o=nav.classList.toggle('open');b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu');});
  m.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');b.setAttribute('aria-expanded','false');}});
})();

/* live demo */
(function(){
  var RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var T={
    plumbing:{def:'Ostrander Plumbing',reply:'Water heater is leaking in the basement. 1204 W 74th Terr, Overland Park.',q:'Got it. Is water still running? We can shut it off and come out today.',addr:'1204 W 74th Terr, Overland Park',issue:'Leaking water heater'},
    hvac:{def:'Ostrander Heating & Air',reply:"Furnace won't kick on and it's 38 degrees. 8810 Rosehill Rd, Lenexa.",q:'Got it. Is the thermostat screen on, and is anyone in the home at risk from the cold?',addr:'8810 Rosehill Rd, Lenexa',issue:'No heat, furnace down'},
    electrical:{def:'Ostrander Electric',reply:'Half the outlets in the kitchen died. 6620 Pflumm Rd, Shawnee.',q:'Got it. Any burning smell or warm outlets? Have you checked the breaker panel?',addr:'6620 Pflumm Rd, Shawnee',issue:'Kitchen outlets dead'}
  };
  var shop=document.getElementById('dShop'),trade=document.getElementById('dTrade'),run=document.getElementById('dRun'),
      body=document.getElementById('dBody'),nameEl=document.getElementById('dName'),
      card=document.getElementById('dCard'),cA=document.getElementById('cAddr'),cI=document.getElementById('cIssue'),cS=document.getElementById('cStat');
  if(!run)return;
  var timers=[],played=false;
  function nm(){var v=shop.value.trim();return v||'Your Shop';}
  function head(){nameEl.textContent=nm();}
  shop.addEventListener('input',head);
  trade.addEventListener('change',function(){
    var v=shop.value.trim();
    for(var k in T){if(v===T[k].def){shop.value=T[trade.value].def;head();break;}}
    if(played)reset();
  });
  function clear(){timers.forEach(clearTimeout);timers=[];}
  function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
  function add(node){body.appendChild(node);return node;}
  function reset(){
    clear();played=false;body.innerHTML='';
    var p=el('p','idle','Press “Simulate a missed call” to see the text your customer receives.');body.appendChild(p);
    card.classList.add('wait');cA.textContent='Waiting for reply…';cI.textContent='Waiting for reply…';cS.textContent='Not started';
    run.textContent='Simulate a missed call';
  }
  function play(){
    clear();body.innerHTML='';played=true;head();
    card.classList.add('wait');cA.textContent='Waiting for reply…';cI.textContent='Waiting for reply…';cS.textContent='Texting back…';
    run.textContent='Reset and replay';
    var d=T[trade.value],s=nm();
    var steps=[
      [0,function(){var m=el('p','sys');m.appendChild(el('b',null,'7:42 PM  Missed call'));m.appendChild(document.createTextNode(' (816) 555-0142 called '+s+'. No answer.'));add(m);}],
      [2000,function(){add(el('div','bub out','Sorry we missed your call at '+s+'! What do you need help with, and what\'s the address? Reply STOP to opt out.'));cS.textContent='Texted back in 8 sec';}],
      [4600,function(){add(el('div','bub in',d.reply));cA.textContent=d.addr;cI.textContent=d.issue;}],
      [6300,function(){add(el('div','bub out',d.q));}],
      [6900,function(){card.classList.remove('wait');}]
    ];
    steps.forEach(function(st){
      if(RM){st[1]();}
      else timers.push(setTimeout(st[1],st[0]));
    });
  }
  run.addEventListener('click',play);
})();

/* roi */
(function(){
  var c=document.getElementById('rCalls'),v=document.getElementById('rVal'),s=document.getElementById('rShare');
  if(!c)return;
  var oc=document.getElementById('oCalls'),ov=document.getElementById('oVal'),os=document.getElementById('oShare'),out=document.getElementById('rOut'),cmp=document.getElementById('rCmp');
  function f(n){return '$'+Math.round(n).toLocaleString('en-US');}
  function calc(){
    var x=c.value*4.33*v.value*(s.value/100);
    oc.textContent=c.value;ov.textContent=f(v.value);os.textContent=s.value+'%';
    out.textContent=f(x);
    var r=x/150;
    cmp.textContent=r>=1.5?"That's about "+(r<10?r.toFixed(1):Math.round(r))+"× the monthly cost.":r>=1?"That's roughly what it costs. One extra booked job covers it.":"At these numbers, it's less than the monthly cost.";
  }
  [c,v,s].forEach(function(i){i.addEventListener('input',calc)});calc();
})();
