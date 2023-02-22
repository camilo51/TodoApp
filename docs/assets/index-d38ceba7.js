(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const p of d.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function l(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(o){if(o.ep)return;o.ep=!0;const d=l(o);fetch(o.href,d)}})();let f;const b=new Uint8Array(16);function C(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(b)}const n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).slice(1));function S(e,t=0){return(n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]).toLowerCase()}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:E};function v(e,t,l){if(w.randomUUID&&!t&&!e)return w.randomUUID();e=e||{};const i=e.random||(e.rng||C)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){l=l||0;for(let o=0;o<16;++o)t[l+o]=i[o];return t}return S(i)}class A{constructor(t){this.id=v(),this.descripcion=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"Completed",Pending:"Pending"},s={todos:[],filter:a.All},P=()=>{L(),console.log("InitStore :)")},L=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));s.todos=e,s.filter=t},h=()=>{localStorage.setItem("state",JSON.stringify(s))},I=(e=a.All)=>{switch(e){case a.All:return[...s.todos];case a.Completed:return s.todos.filter(t=>t.done);case a.Pending:return s.todos.filter(t=>!t.done);default:throw new Error(`Opcion ${e} is not valid`)}},O=e=>{if(!e)throw new Error("Description is required");s.todos.push(new A(e)),h()},U=e=>{s.todos=s.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),h()},D=e=>{s.todos=s.todos.filter(t=>t.id!==e),h()},F=()=>{s.todos=s.todos.filter(e=>!e.done),h()},q=(e=a.All)=>{s.filter=e,h()},x=()=>s.filter,c={initStore:P,loadStore:L,getTodo:I,addTodo:O,toggleTodo:U,deleteTodo:D,deleteCompleted:F,setFilter:q,getCurrentFilter:x},N=`<header>\r
    <h1>Tareas</h1>\r
</header>\r
<section class="todoapp">\r
    <header class="header">\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué Necesita Hacer?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <!-- <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label> -->\r
        <ul class="todo-list"></ul>\r
    </section>\r
    <footer class="footer">\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <ul class="filters">\r
            <li>\r
                <a class="filtro"href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
`;let y;const k=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error("Element ${elementId} not Found");y.innerHTML=c.getTodo(a.Pending).length},M=e=>{if(!e)throw new Error("A TODO Object is required");const t=`            
        <div class="view">
            <input class="toggle" type="checkbox" ${e.done?"checked":""}>
            <label>${e.descripcion}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">`,l=document.createElement("li");return l.setAttribute("data-id",e.id),l.innerHTML=t,e.done&&l.classList.add("completed"),l};let g;const H=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element ${e} not found`);g.innerHTML="",t.forEach(l=>{g.append(M(l))})},m={TodoList:".todo-list",NewTodoInput:"#new-todo-input",ClearCompleted:".clear-completed",TodoFilter:".filtro",PendingCount:"#pending-count"},$=e=>{const t=()=>{const r=c.getTodo(c.getCurrentFilter());H(m.TodoList,r),l()},l=()=>{k(m.PendingCount)};(()=>{const r=document.createElement("div");r.innerHTML=N,document.querySelector(e).append(r),t()})();const i=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),d=document.querySelector(m.ClearCompleted),p=document.querySelectorAll(m.TodoFilter);i.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(c.addTodo(r.target.value),t(),r.target.value="")}),o.addEventListener("click",r=>{const u=r.target.closest("[data-id]");c.toggleTodo(u.getAttribute("data-id")),t()}),o.addEventListener("click",r=>{const u=r.target.closest("[data-id]"),T=r.target.className==="destroy";!u||!T||(c.deleteTodo(u.getAttribute("data-id")),t())}),d.addEventListener("click",()=>{c.deleteCompleted(),t()}),p.forEach(r=>{r.addEventListener("click",u=>{switch(p.forEach(T=>T.classList.remove("selected")),u.target.classList.add("selected"),u.target.text){case"Todos":c.setFilter(a.All);break;case"Pendientes":c.setFilter(a.Pending);break;case"Completados":c.setFilter(a.Completed);break}t()})})};c.initStore();$("#app");
