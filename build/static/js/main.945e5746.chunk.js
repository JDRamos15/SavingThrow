(this["webpackJsonpsaving-throw"]=this["webpackJsonpsaving-throw"]||[]).push([[0],{31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},36:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),r=n(19),c=n.n(r),i=(n(31),n(32),n(22)),l=n(2),o=n(20),u=n(21),m=n(26),d=n(25),j=(n(33),n(1)),b=function(e){Object(m.a)(n,e);var t=Object(d.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object(j.jsx)("div",{className:"Background",children:Object(j.jsx)("div",{className:"Title",children:"Saving Throw"})})}}]),n}(s.a.Component),h=n(3),p=n.n(h),O=n(8),x=n(9),f=n(24);n(36);function v(){var e=Object(f.a)({defaultValues:{first_name:"Bob",last_name:"Bobson",username:"bobyWillRockU",email:"robert@email.com",password:"R0b#rt123"}}),t=e.register,n=e.handleSubmit,s=e.errors,r=Object(a.useState)(!1),c=Object(x.a)(r,2),i=c[0],l=c[1],o=Object(a.useState)([]),u=Object(x.a)(o,2),m=(u[0],u[1]);return Object(j.jsxs)("form",{onSubmit:n(function(){var e=Object(O.a)(p.a.mark((function e(t){var n,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l(!0),m([]),console.log(t,"formData"),e.next=5,fetch("api/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstName:t.first_name,lastName:t.last_name,username:t.username,email:t.email,password:t.password})});case 5:return n=e.sent,e.next=8,n.json();case 8:a=e.sent,console.log(a),"Success"==a?console.log(a,":Server Data"):console.log("Wrong"),l(!1);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("label",{htmlFor:"name",children:"First Name"}),Object(j.jsx)("input",{type:"text",name:"first_name",id:"first_name",ref:t({required:{value:!0,message:"Type your first name."}})}),s.first_name?Object(j.jsxs)("div",{children:[s.first_name.message," "]}):null]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("label",{htmlFor:"name",children:"Last Name"}),Object(j.jsx)("input",{type:"text",name:"last_name",id:"last_name",ref:t({required:{value:!0,message:"Type your last name."}})}),s.last_name?Object(j.jsxs)("div",{children:[s.last_name.message," "]}):null]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("label",{htmlFor:"username",children:"Username"}),Object(j.jsx)("input",{type:"text",name:"username",id:"username",ref:t({required:{value:!0,message:"Please enter valid username."}})}),s.username?Object(j.jsxs)("div",{children:[s.username.message," "]}):null]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("label",{htmlFor:"email",children:"Email"}),Object(j.jsx)("input",{type:"email",name:"email",id:"email",ref:t({required:{value:!0,message:"Please enter valid email."}})}),s.email?Object(j.jsxs)("div",{children:[s.email.message," "]}):null]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("label",{htmlFor:"password",children:"Password"}),Object(j.jsx)("input",{type:"password",name:"password",id:"password",ref:t({required:"required",minLength:{value:8,message:"Must be 8 characters long."},validate:function(e){return[/[a-z]/,/[A-Z]/,/[0-9]/,/[^a-zA-Z0-9]/].every((function(t){return t.test(e)}))||"Must contain lower, upper number, and special character"}})}),s.password?Object(j.jsxs)("div",{children:[s.password.message," "]}):null]}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{type:"submit",disabled:i,children:" Create Account"})})]})}var g=function(){return Object(j.jsx)(i.a,{children:Object(j.jsxs)(l.d,{children:[Object(j.jsx)(l.b,{exact:!0,path:"/",component:b}),Object(j.jsx)(l.b,{exact:!0,path:"/create-user",component:v}),Object(j.jsx)(l.a,{to:"/"})]})})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,43)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),a(e),s(e),r(e),c(e)}))};c.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(g,{})}),document.getElementById("root")),y()}},[[42,1,2]]]);
//# sourceMappingURL=main.945e5746.chunk.js.map