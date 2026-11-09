/* Blueprinting site: mobile menu, cost estimator, pilot form */
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
  var oc=document.getElementById('oCalls'),ov=document.getElementById('oVal'),os=document.getElementById('oShare'),out=document.getElementById('rOut'),cmp=document.getElementById('rCmp'),fm=document.getElementById('rFormula');
  function f(n){return '$'+Math.round(n).toLocaleString('en-US');}
  function calc(){
    var x=c.value*4.33*v.value*(s.value/100);
    oc.textContent=c.value;ov.textContent=f(v.value);os.textContent=s.value+'%';
    out.textContent=f(x);
    fm.textContent=c.value+' missed calls/wk \u00d7 4.33 wks \u00d7 '+f(v.value)+' avg job \u00d7 '+s.value+'% close rate = '+f(x)+'/mo';
    var r=x/150;
    cmp.textContent=r>=1.5?'About '+(r<10?r.toFixed(1):Math.round(r))+'\u00d7 the monthly cost.':r>=1?'Roughly the monthly cost. One extra booked job covers it.':'Less than the monthly cost at these numbers.';
  }
  [c,v,s].forEach(function(i){i.addEventListener('input',calc);});calc();
})();
(function(){
  var form=document.getElementById('pilotForm');
  if(!form)return;
  var phone=document.getElementById('fPhone'),btn=document.getElementById('pilotSubmit'),ok=document.getElementById('pilotSuccess'),bad=document.getElementById('pilotError');
  function digits(x){var d=x.replace(/\D/g,'');if(d.length===11&&d.charAt(0)==='1')d=d.slice(1);return d.slice(0,10);}
  function mask(d){if(!d)return '';if(d.length<4)return '('+d;if(d.length<7)return '('+d.slice(0,3)+') '+d.slice(3);return '('+d.slice(0,3)+') '+d.slice(3,6)+'-'+d.slice(6);}
  phone.addEventListener('input',function(){phone.value=mask(digits(phone.value));});
  var rules=[
    ['fShop','eShop',function(x){return x.trim().length>=2;},'Enter your shop name.'],
    ['fName','eName',function(x){return x.trim().length>=2;},'Enter your name.'],
    ['fPhone','ePhone',function(x){return digits(x).length===10;},'Enter a 10-digit mobile number, like (555) 555-5555.'],
    ['fTrade','eTrade',function(x){return x!=='';},'Choose your trade.']
  ];
  function check(r){var el=document.getElementById(r[0]),er=document.getElementById(r[1]),good=r[2](el.value);
    el.setAttribute('aria-invalid',good?'false':'true');er.textContent=good?'':r[3];return good;}
  rules.forEach(function(r){var el=document.getElementById(r[0]);
    el.addEventListener('blur',function(){if(el.value!==''||el.getAttribute('aria-invalid')==='true')check(r);});
    el.addEventListener(el.tagName==='SELECT'?'change':'input',function(){if(el.getAttribute('aria-invalid')==='true')check(r);});
  });
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var first=null;
    rules.forEach(function(r){if(!check(r)&&!first)first=document.getElementById(r[0]);});
    if(first){first.focus();return;}
    var data={
      'Shop name':form['Shop name'].value.trim(),
      'Name':form['Name'].value.trim(),
      'Mobile number':phone.value,
      'Trade':form['Trade'].value,
      'SMS consent':document.getElementById('fConsent').checked?'Yes, agreed to pilot text messages':'No',
      '_subject':'New pilot request',
      '_template':'table',
      '_captcha':'false',
      '_honey':form['_honey'].value
    };
    btn.disabled=true;btn.classList.add('is-loading');btn.textContent='Sending\u2026';
    var ctl=window.AbortController?new AbortController():null,timer=ctl?setTimeout(function(){ctl.abort();},20000):null;
    fetch(form.action,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data),signal:ctl?ctl.signal:undefined})
      .then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j};});})
      .then(function(res){
        var good=res.ok&&res.j&&(res.j.success===true||res.j.success==='true');
        form.hidden=true;(good?ok:bad).hidden=false;(good?ok:bad).focus();
      })
      .catch(function(){form.hidden=true;bad.hidden=false;bad.focus();})
      .then(function(){if(timer)clearTimeout(timer);btn.disabled=false;btn.classList.remove('is-loading');btn.textContent='Request my free pilot';});
  });
})();
