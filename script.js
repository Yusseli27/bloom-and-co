const $=s=>document.querySelector(s);
const nav=$('#nav'),menu=$('#menuToggle'),drawer=$('#drawer'),backdrop=$('#backdrop');
let cart=[];
$('#year').textContent=new Date().getFullYear();
menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.textContent=nav.classList.contains('open')?'×':'☰';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.textContent='☰';}));
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('show'),2200);}
function render(){
 $('#count').textContent=cart.length;
 $('#total').textContent='$'+cart.reduce((s,x)=>s+x.price,0).toFixed(2);
 const box=$('#cartItems');box.innerHTML='';
 if(!cart.length){box.innerHTML='<p class="empty">Your bag is waiting for a little bloom. ✿</p>';return;}
 cart.forEach((item,i)=>{const row=document.createElement('div');row.className='cart-row';const info=document.createElement('div');const name=document.createElement('strong');name.textContent=item.name;const price=document.createElement('small');price.textContent='$'+item.price.toFixed(2);info.append(name,price);const remove=document.createElement('button');remove.className='remove';remove.textContent='Remove';remove.addEventListener('click',()=>{cart.splice(i,1);render();});row.append(info,remove);box.append(row);});
}
document.querySelectorAll('.add').forEach(b=>b.addEventListener('click',()=>{cart.push({name:b.dataset.name,price:Number(b.dataset.price)});render();toast(b.dataset.name+' added to your bag');}));
function open(){drawer.classList.add('open');backdrop.classList.add('open');drawer.setAttribute('aria-hidden','false');}
function close(){drawer.classList.remove('open');backdrop.classList.remove('open');drawer.setAttribute('aria-hidden','true');}
$('#openBag').addEventListener('click',open);$('#closeBag').addEventListener('click',close);backdrop.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelector('.filter.active').classList.remove('active');b.classList.add('active');document.querySelectorAll('.product').forEach(p=>p.hidden=b.dataset.filter!=='all'&&p.dataset.category!==b.dataset.filter);}));
$('#sort').addEventListener('change',e=>{const grid=$('#products'),cards=[...grid.querySelectorAll('.product')],mode=e.target.value;cards.sort((a,b)=>mode==='low'?+a.dataset.price- +b.dataset.price:mode==='high'?+b.dataset.price- +a.dataset.price:+a.dataset.order- +b.dataset.order);cards.forEach(c=>grid.append(c));});
$('#customForm').addEventListener('submit',e=>{e.preventDefault();$('#customMessage').textContent=`Lovely choice! Your ${$('#size').value.toLowerCase()} ${$('#flower').value.toLowerCase()} bouquet in ${$('#color').value.toLowerCase()} is ready to personalize. This is a design preview, not an order.`;});
$('#checkout').addEventListener('click',()=>toast(cart.length?'This is a portfolio demo. Checkout is not connected yet.':'Add a flower to your bag first'));
