(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),c=t(13),r=t.n(c),l=t(2),o=function(e){var n=e.name,t=e.number,a=e.deleteHandler;return u.a.createElement("li",null,n," ",t,u.a.createElement("button",{onClick:a},"delete"))},i=function(e){var n=e.text,t=e.value,a=e.handler;return u.a.createElement("div",null,n," ",u.a.createElement("input",{value:t,onChange:a}))},m=function(e){var n=e.header,t=e.submitFunction,a=e.name,c=e.nameHandler,r=e.number,l=e.numberHandler;return u.a.createElement(u.a.Fragment,null,u.a.createElement("h2",null,n),u.a.createElement("form",{onSubmit:t},u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:a,onChange:c})),u.a.createElement("div",null,"number: ",u.a.createElement("input",{value:r,onChange:l})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add"))))},f=function(e){var n=e.message,t=e.type;return null===n?null:u.a.createElement("div",{className:"".concat(t)},n)},d=t(3),s=t.n(d),b="/api/persons",h=function(){return s.a.get(b)},p=function(e){return s.a.post(b,e)},E=function(e,n){return s.a.put("".concat(b,"/").concat(e),n)},v=function(e){return s.a.delete("".concat(b,"/").concat(e))},j=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),d=Object(l.a)(r,2),s=d[0],b=d[1],j=Object(a.useState)(""),w=Object(l.a)(j,2),O=w[0],g=w[1],S=Object(a.useState)(""),k=Object(l.a)(S,2),y=k[0],C=k[1],H=Object(a.useState)(""),T=Object(l.a)(H,2),x=T[0],F=T[1],D=Object(a.useState)(""),J=Object(l.a)(D,2),L=J[0],N=J[1],U=t.filter((function(e){return e.name.toLowerCase().includes(y.toLowerCase())}));return Object(a.useEffect)((function(){h().then((function(e){c(e.data)}))}),[]),u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(f,{message:x,type:L}),u.a.createElement(i,{text:"filter shown with",value:y,handler:function(e){C(e.target.value)}}),u.a.createElement(m,{header:"add a new",submitFunction:function(e){e.preventDefault();var n={name:s,number:O};if(t.some((function(e){return e.name===s}))){if(!window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?")))return;var a=t.find((function(e){return e.name===s})).id;E(a,n).then((function(e){c(t.map((function(n){return n.id!==a?n:e.data}))),F("".concat(s," has been updated")),N("info"),setTimeout((function(){F(null)}),5e3)})).catch((function(e){F("Unable to update ".concat(s,": ").concat(e)),N("error"),setTimeout((function(){F(null)}),15e3)}))}else p(n).then((function(e){c(t.concat(e.data)),b(""),g(""),F("Added ".concat(s)),N("info"),setTimeout((function(){F(null)}),5e3)})).catch((function(e){F(e.response.data),N("error"),setTimeout((function(){F(null)}),15e3)}))},name:s,nameHandler:function(e){b(e.target.value)},number:O,numberHandler:function(e){g(e.target.value)}}),u.a.createElement("h2",null,"Numbers"),u.a.createElement("ul",null,U.map((function(e,n){return u.a.createElement(o,{key:n,name:e.name,number:e.number,deleteHandler:function(){return function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&v(e).then((function(e){c(t.filter((function(e){return e!==n}))),F("".concat(n.name," has been deleted")),N("info"),setTimeout((function(){F(null)}),5e3)})).catch((function(e){F("Unable to delete ".concat(s,": ").concat(e)),N("error"),setTimeout((function(){F(null)}),15e3)}))}(e.id)}})}))))};t(36);r.a.render(u.a.createElement(j,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.a1360e9f.chunk.js.map