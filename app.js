/* Blueprinting site: mobile menu and cost estimator */
(function(){
  var nav=document.getElementById('nav'),b=document.getElementById('burger'),m=document.getElementById('menu');
  if(b&&nav){
    b.addEventListener('click',function(){var o=nav.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Close menu':'Open menu');});
    m.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Open menu');}});
  }
})();
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
    cmp.textContent=r>=1.5?'About '+(r<10?r.toFixed(1):Math.round(r))+'\u00d7 the monthly cost.':r>=1?'Roughly the monthly cost. One extra booked job covers it.':'Less than the monthly cost at these numbers.';
  }
  [c,v,s].forEach(function(i){i.addEventListener('input',calc);});calc();
})();
