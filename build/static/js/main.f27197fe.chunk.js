(this["webpackJsonpsaving-throw"]=this["webpackJsonpsaving-throw"]||[]).push([[0],{115:function(e,t,n){},116:function(e,t,n){},117:function(e,t,n){},119:function(e,t,n){},126:function(e,t,n){},127:function(e,t,n){},160:function(e,t,n){},161:function(e,t,n){},165:function(e,t,n){},170:function(e,t,n){},172:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(27),c=n.n(s),i=(n(115),n(116),n(98)),o=n(11),l=n(89),d=n(90),j=n(100),u=n(99),m=(n(117),n(1)),b=function(e){Object(j.a)(n,e);var t=Object(u.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){return Object(m.jsx)(r.a.Fragment,{children:Object(m.jsx)("div",{className:"Background",children:Object(m.jsx)("div",{className:"Title",children:"Saving Throw"})})})}}]),n}(r.a.Component),h=n(7),p=n(204),x=n(206),O=function(){var e=localStorage.getItem("username");return e?JSON.parse(e):null},f=function(){var e=localStorage.getItem("isLogged");return!!e},g=function(e,t,n,a,r){var s=t.replace('"',""),c=a.replace('"',"");localStorage.setItem("token",s),localStorage.setItem("username",JSON.stringify(n)),localStorage.setItem("isLogged",JSON.stringify(e)),localStorage.setItem("public_id",c),localStorage.setItem("fname",JSON.stringify(r))},v=function(){return localStorage.getItem("token")||null},w=function(){return localStorage.getItem("public_id")||""},y=function(){localStorage.removeItem("token"),localStorage.removeItem("username"),localStorage.removeItem("public_id"),localStorage.removeItem("isLogged")};n(119);function S(){var e=r.a.useState(f()),t=Object(h.a)(e,2),n=t[0],s=t[1];return Object(a.useEffect)((function(){console.log("here"),n!=f()&&s(f())})),n?Object(m.jsxs)(p.a,{collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark",children:[Object(m.jsx)(p.a.Brand,{href:"/",children:Object(m.jsx)("h1",{children:"Saving Throw"})}),Object(m.jsx)(p.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),Object(m.jsx)(p.a.Collapse,{id:"responsive-navbar-nav",children:Object(m.jsxs)(x.a,{className:"ml-auto",children:[Object(m.jsx)(x.a.Link,{href:"/profile/"+O(),children:"Profile"}),Object(m.jsx)(x.a.Link,{href:"/joinGame",children:"Join Game"}),Object(m.jsx)(x.a.Link,{href:"/",onClick:y,children:"Logout"})]})})]}):Object(m.jsxs)(p.a,{collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark",children:[Object(m.jsx)(p.a.Brand,{href:"/",children:Object(m.jsx)("h1",{children:"Saving Throw"})}),Object(m.jsx)(p.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),Object(m.jsx)(p.a.Collapse,{id:"responsive-navbar-nav",children:Object(m.jsxs)(x.a,{className:"ml-auto",children:[Object(m.jsx)(x.a.Link,{href:"/create-user",children:"Create account"}),Object(m.jsx)(x.a.Link,{href:"/login",children:"Sign in"})]})})]})}var k=n(4),N=n.n(k),C=n(10),T=n(26);n(126);function _(e){var t=Object(T.a)({defaultValues:{first_name:"",last_name:"",username:"",email:"",password:""}}),n=t.register,r=t.handleSubmit,s=t.errors,c=Object(a.useState)(!1),i=Object(h.a)(c,2),o=i[0],l=i[1],d=Object(a.useState)([]),j=Object(h.a)(d,2),u=j[0],b=j[1];return Object(m.jsxs)("form",{onSubmit:r(function(){var t=Object(C.a)(N.a.mark((function t(n){var a,r,s,c;return N.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l(!0),b([]),console.log(n,"formData"),t.next=5,fetch("api/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstName:n.first_name,lastName:n.last_name,username:n.username,email:n.email,password:n.password})});case 5:return a=t.sent,t.next=8,a.json();case 8:if("Success"!=(r=t.sent)){t.next=19;break}return t.next=12,fetch("api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n.username,password:n.password})});case 12:return s=t.sent,t.next=15,s.json();case 15:"Success"==(c=t.sent).status&&(console.log(c),g(c.loggedIn,c.token,c.username,c.public_id,c.fname),e.history.push("/profile/"+c.username)),t.next=20;break;case 19:b([r.error]);case 20:l(!1);case 21:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),children:[u?Object(m.jsx)("ul",{children:u.map((function(e){return Object(m.jsx)("li",{children:e},e)}))}):null,Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"name",children:"First Name"}),Object(m.jsx)("input",{type:"text",name:"first_name",id:"first_name",ref:n({required:{value:!0,message:"Type your first name."}})}),s.first_name?Object(m.jsxs)("div",{children:[s.first_name.message," "]}):null]}),Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"name",children:"Last Name"}),Object(m.jsx)("input",{type:"text",name:"last_name",id:"last_name",ref:n({required:{value:!0,message:"Type your last name."}})}),s.last_name?Object(m.jsxs)("div",{children:[s.last_name.message," "]}):null]}),Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"username",children:"Username"}),Object(m.jsx)("input",{type:"text",name:"username",id:"username",ref:n({required:{value:!0,message:"Please enter valid username."}})}),s.username?Object(m.jsxs)("div",{children:[s.username.message," "]}):null]}),Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"email",children:"Email"}),Object(m.jsx)("input",{type:"email",name:"email",id:"email",ref:n({required:{value:!0,message:"Please enter valid email."}})}),s.email?Object(m.jsxs)("div",{children:[s.email.message," "]}):null]}),Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"password",children:"Password"}),Object(m.jsx)("input",{type:"password",name:"password",id:"password",ref:n({required:"required",minLength:{value:8,message:"Must be 8 characters long."},validate:function(e){return[/[a-z]/,/[A-Z]/,/[0-9]/,/[^a-zA-Z0-9]/].every((function(t){return t.test(e)}))||"Must contain lower, upper number, and special character"}})}),s.password?Object(m.jsxs)("div",{children:[s.password.message," "]}):null]}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",disabled:o,children:" Create Account"})})]})}var P=n(207);n(127);function F(e){var t=Object(T.a)({}),n=t.register,r=t.handleSubmit,s=t.errors,c=Object(a.useState)(!1),i=Object(h.a)(c,2),o=(i[0],i[1]),l=Object(a.useState)(!1),d=Object(h.a)(l,2),j=d[0],u=d[1],b=Object(a.useState)([]),p=Object(h.a)(b,2),x=(p[0],p[1]);var f=v();return Object(m.jsxs)("form",{onSubmit:r(function(){var t=Object(C.a)(N.a.mark((function t(n){var a,r;return N.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o(!0),x([]),console.log(w()),t.next=5,fetch("/api/create-game",{method:"POST",headers:{"Content-Type":"application/json","x-Access-Token":"".concat(f)},body:JSON.stringify({name:n.name,description:n.description,looking_for:j,start_date:n.start_date,password:n.password,capacity:n.capacity})});case 5:return a=t.sent,t.next=8,a.json();case 8:"Success"==(r=t.sent)?(console.log(r[0],":Server Data"),e.history.push("/profile/"+O())):console.log("Wrong"),o(!1);case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),children:[Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"name",children:"Campaign Name"}),Object(m.jsx)("input",{type:"text",name:"name",id:"name",ref:n({required:{value:!0,message:"Type the name of the campaign"}})}),s.name?Object(m.jsxs)("div",{children:[s.name.message," "]}):null]}),Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"description",children:"Description"}),Object(m.jsx)("input",{type:"text",name:"description",id:"description",ref:n({required:{value:!1,message:"Please enter your campaign description"}})})]}),Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"looking_for",children:"Looking for new players?"}),Object(m.jsx)(P.a,{onChange:function(){u((function(e){return!e}))},value:j})]}),Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"password",children:"Access code? (12 characters max)"}),Object(m.jsx)("input",{type:"text",name:"password",id:"password",ref:n({required:{value:!0,message:"Please enter your campaign access code"}})})]}),Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"capacity",children:"How many players? (8 players max)"}),Object(m.jsx)("input",{type:"number",name:"capacity",id:"capacity",ref:n({required:{value:!0,message:"Please enter your campaign capacity"}})}),s.description?Object(m.jsxs)("div",{children:[s.description.message," "]}):null]}),Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"date",children:"Campaign start date"}),Object(m.jsx)("input",{type:"date",name:"start_date",id:"start_date",ref:n({required:{value:!0,message:"Please enter your campaign start date"}})}),s.start_date?Object(m.jsxs)("div",{children:[s.start_date.message," "]}):null]}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",children:" Create Game"})})]})}function I(e){var t=Object(T.a)({}),n=t.register,r=t.handleSubmit,s=t.errors,c=Object(a.useState)(!1),i=Object(h.a)(c,2),o=i[0],l=i[1],d=Object(a.useState)([]),j=Object(h.a)(d,2),u=j[0],b=j[1];return Object(m.jsxs)("form",{onSubmit:r(function(){var e=Object(C.a)(N.a.mark((function e(t){var n,a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l(!0),b([]),console.log(t,"formData"),e.next=5,fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t.username,password:t.password})});case 5:return n=e.sent,e.next=8,n.json();case 8:"Success"==(a=e.sent).status?(console.log(a),console.log(a.token),g(a.loggedIn,a.token,a.username,a.public_id,a.fname),window.location.href="/profile/"+a.username):b([a.error]),l(!1);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),children:[u?Object(m.jsx)("ul",{children:u.map((function(e){return Object(m.jsx)("li",{children:e},e)}))}):null,Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"username",children:" Username"}),Object(m.jsx)("input",{type:"username",name:"username",id:"username",ref:n({required:{value:!0,message:"Please enter valid username."}})}),s.username?Object(m.jsxs)("div",{children:[s.username.message," "]}):null]}),Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"password",children:" Password"}),Object(m.jsx)("input",{type:"password",name:"password",id:"password",ref:n({required:"required"})}),s.password?Object(m.jsxs)("div",{children:[s.password.message," "]}):null]}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",disabled:o,children:" Login "})})]})}function L(e){var t=Object(T.a)(),n=t.register,r=t.handleSubmit,s=(t.errors,Object(a.useState)(!1)),c=Object(h.a)(s,2),i=(c[0],c[1]),o=Object(a.useState)([]),l=Object(h.a)(o,2),d=l[0],j=l[1];return Object(m.jsxs)("form",{onSubmit:r(function(){var e=Object(C.a)(N.a.mark((function e(t){var n,a,r;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i(!0),j([]),(n=new FormData).append("characterSheet",t.file[0]),e.next=6,fetch("/api/create-charactersheet",{method:"POST",body:n});case 6:return a=e.sent,e.next=9,a.json();case 9:"Success"==(r=e.sent).status?console.log(t[0],":Server Data"):j([r.error]),i(!1);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),children:[d?Object(m.jsx)("ul",{children:d.map((function(e){return Object(m.jsx)("li",{children:e},e)}))}):null,Object(m.jsxs)("div",{children:[Object(m.jsx)("input",{ref:n,type:"file",name:"file"}),Object(m.jsx)("button",{type:"submit",children:" Submit file"})]})]})}var E=n(97),q=n(196);n(160);function A(e){var t=e.setMessage,n=e.sendMessage,a=e.message,r=e.leaveRoom;return Object(m.jsx)("div",{children:Object(m.jsxs)("form",{className:"chat-form",children:[Object(m.jsx)("input",{className:"input",type:"text",placeholder:"Type a message...",value:a,onChange:function(e){var n=e.target.value;return t(n)},onKeyPress:function(e){return"Enter"===e.key?n(e):null}}),Object(m.jsx)(q.a,{variant:"contained",onClick:function(e){return n(e)},children:"Send"}),Object(m.jsx)(q.a,{variant:"contained",onClick:Object(C.a)(N.a.mark((function e(){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r();case 2:case"end":return e.stop()}}),e)}))),children:"Leave Chat"})]})})}n(161);var J,R,D=function(e){var t=e.border,n=e.color,a=e.children,r=e.height,s=e.onClick,c=e.radius,i=e.width;return Object(m.jsx)("button",{onClick:s,style:{backgroundColor:n,border:t,borderRadius:c,height:r,width:i},children:a})},M="https://saving-throw.herokuapp.com/";function G(e){Object(o.g)();var t=Object(o.h)(),n=t.room,s=t.code,c=Object(a.useState)(""),i=Object(h.a)(c,2),l=i[0],d=i[1],j=Object(a.useState)([]),u=Object(h.a)(j,2),b=u[0],p=u[1],x=Object(a.useState)(!1),f=Object(h.a)(x,2),g=(f[0],f[1],O()),w=r.a.useRef(null),S=b,k=v();Object(a.useEffect)((function(){return R=!1,function(){_.apply(this,arguments)}(),function(){console.log("here")}}),[M]),Object(a.useEffect)((function(){R&&(J.on("close",(function(){window.location.href="/profile/"+g})),J.on("message",(function(e){T(e),"Close Room."===e&&P()})),b&&w.current&&w.current.scrollIntoView({behavior:"smooth"}))}),[]);function T(e){console.log("HEREEEE"),S=S.concat(e),p(S)}function _(){return(_=Object(C.a)(N.a.mark((function e(){var t,a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/check-room",{method:"PUT",headers:{"Content-Type":"application/json","x-Access-Token":"".concat(k)},body:JSON.stringify({room:Number(n),code:s})});case 2:return t=e.sent,e.next=5,t.json();case 5:"Success"==(a=e.sent).status&&(R=!0,(J=Object(E.io)(M)).emit("join",{name:g,room:Number(n)}),J.on("message",(function(e){T(e),"Close Room."===e&&P()}))),"Room does not exist"==a.error&&(window.location.href="/profile/"+g),"Token is invalid!"==a.status&&(y(),window.location.href="/");case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(){return F.apply(this,arguments)}function F(){return(F=Object(C.a)(N.a.mark((function e(){var t,a,r,c;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/leave-room",{method:"PUT",headers:{"Content-Type":"application/json","x-Access-Token":"".concat(k)},body:JSON.stringify({room:Number(n),code:s})});case 2:return t=e.sent,e.next=5,t.json();case 5:if(a=e.sent,console.log(a),!a.error){e.next=12;break}J.emit("close",{name:g,room:a.room}),window.location.href="/profile/"+g,e.next=22;break;case 12:if(J.emit("leave",{name:g,room:Number(n),message:a.message}),"Host is leaving"!==a.status&&"Room is empty"!==a.status){e.next=22;break}return J.emit("close",{name:g,room:a.room}),e.next=17,fetch("/api/delete-room",{method:"DELETE",headers:{"Content-Type":"application/json","x-Access-Token":"".concat(k)},body:JSON.stringify({room:Number(n)})});case 17:return r=e.sent,e.next=20,r.json();case 20:c=e.sent,console.log(c);case 22:"Token is invalid!"==a.status&&(y(),window.location.href="/"),window.location.href="/profile/"+g;case 24:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function I(e){var t,a=(t=e,Math.floor(Math.random()*t)+1);J.emit("message",{name:g,room:Number(n),message:"Rolled d"+e+": "+a},(function(){return d("")}))}return Object(m.jsxs)("div",{children:[Object(m.jsx)("h1",{className:"title",children:"Campaign"}),Object(m.jsxs)("h3",{className:"room",children:["Room: ",n]}),Object(m.jsx)("div",{className:"container",children:Object(m.jsxs)("div",{className:"box",children:[Object(m.jsx)("div",{className:"box-row",children:Object(m.jsx)(D,{border:"default",color:"#fdffc4",height:"15vh",onClick:function(){I(20)},radius:"10%",width:"30vw",children:"d20"})}),Object(m.jsxs)("div",{className:"box-row",children:[Object(m.jsx)(D,{border:"default",color:"#fdffc4",height:"10vh",onClick:function(){I(4)},radius:"10%",width:"10vw",children:"d4"}),Object(m.jsx)(D,{border:"default",color:"#fdffc4",height:"10vh",onClick:function(){I(6)},radius:"10%",width:"10vw",children:"d6"}),Object(m.jsx)(D,{border:"default",color:"#fdffc4",height:"10vh",onClick:function(){I(8)},radius:"10%",width:"10vw",children:"d8"})]}),Object(m.jsxs)("div",{className:"box-row",children:[Object(m.jsx)(D,{border:"default",color:"#fdffc4",height:"10vh",onClick:function(){I(10)},radius:"10%",width:"10vw",children:"d10"}),Object(m.jsx)(D,{border:"default",color:"#fdffc4",height:"10vh",onClick:function(){I(12)},radius:"10%",width:"10vw",children:"d12"}),Object(m.jsx)(D,{border:"default",color:"#fdffc4",height:"10vh",onClick:function(){I(100)},radius:"10%",width:"10vw",children:"d100"})]})]})}),Object(m.jsxs)("div",{className:"Chat",children:[Object(m.jsx)("div",{className:"fields",ref:w,children:b.map((function(e){return Object(m.jsx)("div",{children:e})}))}),Object(m.jsx)(A,{message:l,setMessage:d,sendMessage:function(e){e.preventDefault(),l&&J.emit("message",{name:g,room:Number(n),message:l},(function(){return d("")}))},leaveRoom:P})]})]})}var B=n(19),U=(n(165),n(197)),H=n(209),z=n(198),V=n(174),W=n(200),Z=n(199),K=n(6),Q=n(201),X=n(202),Y=n(203),$=n(208),ee=n(195),te=n(61),ne=n(70),ae=n.n(ne),re=n(205),se=Object(U.a)((function(e){return Object(H.a)({container:{display:"grid",gridTemplateColumns:"repeat(12, 1fr)",gridGap:e.spacing(3)},paper:{padding:e.spacing(1),textAlign:"center",color:e.palette.text.secondary,marginBottom:e.spacing(1)},divider:{margin:e.spacing(2,0)},root:{flexGrow:1,overflow:"hidden",padding:e.spacing(0,3)},cardroot:{maxWidth:"auto",margin:"auto"},media:{height:0,paddingTop:"56.25%"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{backgroundColor:te.a[500]},box:{height:50,display:"flex",padding:8,justifyContent:"flex-end",alignItems:"flex-end"}})}));function ce(e){var t=v(),n=se(),s=r.a.useState(-1),c=Object(h.a)(s,2),i=c[0],o=c[1],l=r.a.useState(-1),d=Object(h.a)(l,2),j=d[0],u=d[1],b=r.a.useState({data:{username:"",uid:0,public_id:0,fname:"",lname:""},rendered:!1}),p=Object(h.a)(b,2),x=p[0],O=p[1],f=r.a.useState([]),g=Object(h.a)(f,2),S=g[0],k=g[1];function T(){return(T=Object(C.a)(N.a.mark((function e(){var n,a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/user",{method:"POST",headers:{"Content-Type":"application/json","x-Access-Token":"".concat(t)},body:JSON.stringify({publicId:w()})});case 2:return n=e.sent,e.next=5,n.json();case 5:a=e.sent,console.log(a),"Token is invalid!"==a.status?y():O({data:{username:a.username,uid:a.uid,public_id:a.publicId,fname:a.fname,lname:a.lname},rendered:!0});case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(){return(_=Object(C.a)(N.a.mark((function e(){var n,a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/getgames",{method:"GET",headers:{"Content-Type":"application/json","x-Access-Token":"".concat(t)}});case 2:return n=e.sent,e.next=5,n.json();case 5:a=e.sent,console.log(a),"Token is invalid!"==a.status&&(y(),window.location.href="/"),"Success"==a.status&&k(a.games);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(){return(P=Object(C.a)(N.a.mark((function e(n,a){var r,s;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/create-room",{method:"POST",headers:{"Content-Type":"application/json","x-Access-Token":"".concat(t)},body:JSON.stringify({rpassword:a,cmid:n})});case 2:return r=e.sent,e.next=5,r.json();case 5:"Success"==(s=e.sent).status?window.location.href="/gamePage/room="+s.room+"&code="+s.password:console.log("Not logged in","room-create fail"),console.log(s,"room"),"Token is invalid!"==s.status&&(y(),window.location.href="/");case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(a.useEffect)((function(){x.rendered||function(){T.apply(this,arguments)}()}),[]),Object(a.useEffect)((function(){!function(){_.apply(this,arguments)}(),console.log(S)}),[]);return 0==S.length?Object(m.jsxs)("div",{className:n.root,children:[Object(m.jsx)(z.a,{variant:"h4",gutterBottom:!0,children:x.data.fname}),Object(m.jsxs)(Z.a,{container:!0,spacing:1,justify:"center",alignItems:"center",children:[Object(m.jsx)(Z.a,{item:!0,xs:4,children:Object(m.jsxs)(V.a,{className:n.paper,children:["Games",Object(m.jsx)(Z.a,{container:!0,wrap:"nowrap",spacing:2,children:Object(m.jsxs)(Z.a,{item:!0,xs:!0,children:[Object(m.jsx)(z.a,{component:"span",children:"No Games"}),Object(m.jsx)(re.a,{component:"span",m:1,className:n.box,children:Object(m.jsx)(q.a,{variant:"contained",color:"secondary",style:{borderRadius:20},href:"/create-game",children:"Add"})})]})})]})}),Object(m.jsx)(Z.a,{item:!0,xs:4,children:Object(m.jsxs)(V.a,{className:n.paper,children:["Friends",Object(m.jsx)(Z.a,{container:!0,wrap:"nowrap",spacing:2,children:Object(m.jsxs)(Z.a,{item:!0,xs:!0,children:[Object(m.jsx)(z.a,{component:"span",children:"No Friends"}),Object(m.jsx)(re.a,{component:"span",m:1,className:n.box,children:Object(m.jsx)(q.a,{variant:"contained",color:"secondary",style:{borderRadius:20},children:"Add"})})]})})]})}),Object(m.jsx)(Z.a,{item:!0,xs:4,children:Object(m.jsxs)(Z.a,{container:!0,children:[Object(m.jsx)(Z.a,{item:!0,xs:12,children:Object(m.jsx)(V.a,{className:n.paper,children:"User Description"})}),Object(m.jsx)(Z.a,{item:!0,xs:12,children:Object(m.jsx)(V.a,{className:n.paper,children:"Character List"})})]})})]}),Object(m.jsx)(W.a,{className:n.divider})]}):Object(m.jsxs)("div",{className:n.root,children:[Object(m.jsx)(z.a,{variant:"h4",gutterBottom:!0,children:x.data.fname}),Object(m.jsxs)(Z.a,{container:!0,spacing:1,justify:"center",alignItems:"center",children:[Object(m.jsx)(Z.a,{item:!0,xs:4,children:Object(m.jsxs)(V.a,{className:n.paper,children:["Games",Object(m.jsx)(Z.a,{container:!0,wrap:"nowrap",spacing:2,children:Object(m.jsx)(Z.a,{item:!0,xs:!0,children:Object(m.jsxs)(z.a,{component:"span",children:[S.map((function(e,t){return Object(m.jsxs)(Q.a,{className:n.cardroot,children:[e.cname,Object(m.jsx)(X.a,{}),Object(m.jsx)(Y.a,{disableSpacing:!0,children:Object(m.jsx)(ee.a,{className:Object(K.a)(n.expand,Object(B.a)({},n.expandOpen,i)),onClick:function(){return function(e){o(i===e?-1:e)}(t)},"aria-expanded":i===t,"aria-label":"show more",children:Object(m.jsx)(ae.a,{})})}),Object(m.jsx)($.a,{in:i===t,timeout:"auto",unmountOnExit:!0,children:Object(m.jsxs)(X.a,{children:[Object(m.jsx)(z.a,{paragraph:!0,children:"Description:"}),Object(m.jsx)(z.a,{paragraph:!0,children:e.cdescription}),Object(m.jsx)(z.a,{children:"Entry Code"}),Object(m.jsx)(z.a,{children:e.password}),Object(m.jsx)(re.a,{component:"span",m:1,className:n.box,children:Object(m.jsx)(q.a,{variant:"contained",color:"secondary",style:{borderRadius:20},onClick:function(){!function(e,t){P.apply(this,arguments)}(e.cmid,e.password)},children:"Play"})})]})})]},e.cmid)})),Object(m.jsx)(re.a,{component:"span",m:1,className:n.box,children:Object(m.jsx)(q.a,{variant:"contained",color:"secondary",style:{borderRadius:20},href:"/create-game",children:"Add"})})]})})})]})}),Object(m.jsx)(Z.a,{item:!0,xs:4,children:Object(m.jsxs)(V.a,{className:n.paper,children:["Friends",[{_id:"1",name:"Carlos"},{_id:"2",name:"Miguel"},{_id:"3",name:"Amanda"}].map((function(e,t){return Object(m.jsxs)(Q.a,{className:n.cardroot,children:[e.name,Object(m.jsx)(X.a,{}),Object(m.jsx)(Y.a,{disableSpacing:!0,children:Object(m.jsx)(ee.a,{className:Object(K.a)(n.expand,Object(B.a)({},n.expandOpen,j)),onClick:function(){return function(e){u(j===e?-1:e)}(t)},"aria-expanded":j===t,"aria-label":"show more",children:Object(m.jsx)(ae.a,{})})}),Object(m.jsx)($.a,{in:j===t,timeout:"auto",unmountOnExit:!0,children:Object(m.jsx)(X.a,{children:Object(m.jsx)("div",{children:"Description:"})})})]},e._id)})),Object(m.jsx)(re.a,{component:"span",m:1,className:n.box,children:Object(m.jsx)(q.a,{variant:"contained",color:"secondary",style:{borderRadius:20},onClick:function(){alert("clicked")},children:"Add"})})]})}),Object(m.jsx)(Z.a,{item:!0,xs:4,children:Object(m.jsxs)(Z.a,{container:!0,children:[Object(m.jsx)(Z.a,{item:!0,xs:12,children:Object(m.jsx)(V.a,{className:n.paper,children:"User Description"})}),Object(m.jsx)(Z.a,{item:!0,xs:12,children:Object(m.jsx)(V.a,{className:n.paper,children:"Character List"})})]})})]}),Object(m.jsx)(W.a,{className:n.divider})]})}n(170);function ie(e){var t=Object(T.a)({}),n=t.register,r=t.handleSubmit,s=t.errors,c=Object(a.useState)(!1),i=Object(h.a)(c,2),o=i[0],l=i[1],d=Object(a.useState)([]),j=Object(h.a)(d,2),u=j[0],b=j[1],p=v();return Object(m.jsxs)("form",{onSubmit:r(function(){var e=Object(C.a)(N.a.mark((function e(t){var n,a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l(!0),b([]),console.log(t,"formData"),e.next=5,fetch("api/join-room",{method:"PUT",headers:{"Content-Type":"application/json","x-Access-Token":"".concat(p)},body:JSON.stringify({room:t.room,password:t.password})});case 5:return n=e.sent,e.next=8,n.json();case 8:a=e.sent,console.log(a,"join"),"Success"==a.status?window.location.href="/gamePage/room="+a.room+"&code="+a.password:b([a.error]),l(!1);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),children:[u?Object(m.jsx)("ul",{children:u.map((function(e){return Object(m.jsx)("li",{children:e},e)}))}):null,Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"name",children:"Room Number"}),Object(m.jsx)("input",{type:"text",name:"room",id:"room",ref:n({required:"required",minLength:{value:4,message:"Must be 4 character long"},maxLength:{value:4,message:"Must be 4 character long"},validate:function(e){return[/[0-9]/].every((function(t){return t.test(e)}))||"Must contain only numbers"}})}),s.room?Object(m.jsxs)("div",{children:[s.room.message," "]}):null]}),Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{htmlFor:"password",children:"Password"}),Object(m.jsx)("input",{type:"password",name:"password",id:"password",ref:n({required:"required",minLength:{value:4,message:"Must be 4 characters long."}})}),s.password?Object(m.jsxs)("div",{children:[s.password.message," "]}):null]}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",disabled:o,children:" Join"})})]})}var oe=function(){return Object(m.jsxs)(r.a.Fragment,{children:[Object(m.jsx)(S,{}),Object(m.jsx)(i.a,{children:Object(m.jsxs)(o.d,{children:[Object(m.jsx)(o.b,{exact:!0,path:"/",component:b}),Object(m.jsx)(o.b,{exact:!0,path:"/create-user",component:_}),Object(m.jsx)(o.b,{exact:!0,path:"/create-game",component:F}),Object(m.jsx)(o.b,{exact:!0,path:"/login",component:I}),Object(m.jsx)(o.b,{exact:!0,path:"/profile/:username",component:ce}),Object(m.jsx)(o.b,{exact:!0,path:"/charactersheet",component:L}),Object(m.jsx)(o.b,{exact:!0,path:"/gamePage/room=:room&code=:code",component:G}),Object(m.jsx)(o.b,{exact:!0,path:"/joinGame",component:ie}),Object(m.jsx)(o.a,{to:"/"})]})})]})},le=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,212)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),s(e),c(e)}))};n(171);c.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(oe,{})}),document.getElementById("root")),le()}},[[172,1,2]]]);
//# sourceMappingURL=main.f27197fe.chunk.js.map