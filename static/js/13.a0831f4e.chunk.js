(this["webpackJsonprunelite.net"]=this["webpackJsonprunelite.net"]||[]).push([[13],{126:function(t,e,a){"use strict";var s=a(0);var c=()=>Object(s.g)("section",{id:"footer"},Object(s.g)("div",{class:"content-section"},Object(s.g)("footer",null,Object(s.g)("hr",null),"Developed with ",Object(s.g)("i",{class:"fas fa-heart"})," and"," ",Object(s.g)("i",{class:"fas fa-coffee"})," using"," ",Object(s.g)("a",{href:"https://getbootstrap.com/"},"Bootstrap"),","," ",Object(s.g)("a",{href:"https://reactjs.org/"},"React")," and"," ",Object(s.g)("a",{href:"https://fontawesome.com/"},"Font Awesome"),Object(s.g)("a",{href:"/atom.xml",class:"float-right"},Object(s.g)("i",{class:"fas fa-rss"})," Subscribe via RSS"))));e.a=t=>{let{children:e,fullWidth:a,...i}=t;return i.class=i.class?"container "+i.class:"container",i.style={...i.style||{},maxWidth:a?"100%":""},Object(s.g)("div",Object.assign({},i,{id:"layout"}),e,Object(s.g)(c,null))}},127:function(t,e,a){"use strict";var s=a(0);var c=()=>Object(s.g)("div",{style:{display:"table",width:"100%",height:"100%"}},Object(s.g)("div",{style:{display:"table-cell",verticalAlign:"middle"}},Object(s.g)("div",{style:{marginLeft:"auto",marginRight:"auto",textAlign:"center",fontWeight:700,color:"white"}},Object(s.g)("div",{class:"fa-4x"},Object(s.g)("i",{class:"fas fa-spinner fa-spin"})))));e.a=t=>e=>class extends s.a{constructor(){super(),this.state={loading:!0}}componentDidMount(){const e=t(this.props);e instanceof Promise?e.then(()=>this.setState({loading:!1})):this.setState({loading:!1})}render(t){const{loading:a}=this.state;return a?Object(s.g)(c,null):Object(s.g)(e,t)}}},131:function(t,e,a){},289:function(t,e,a){"use strict";var s=a(0);e.a=t=>{let{tagName:e,html:a}=t;return Object(s.g)(e,{dangerouslySetInnerHTML:{__html:a}})}},449:function(t,e,a){"use strict";a.r(e);var s=a(0),c=a(27),i=a(11),n=a(127),l=a(126),r=a(7),g=a.n(r),b=a(46),o=a(4),d=a(50),u=a(28),h=a(18),f=a(289),j=a(47);a(131);e.default=Object(c.b)((t,e)=>({...e,externalPlugin:Object(d.e)(t).find(t=>t.internalName===e.internalName)}),t=>Object(i.b)({fetchBootstrap:o.b,fetchConfig:u.c,fetchExternalPlugins:d.c,fetchExternalPluginInfo:d.b,fetchPluginHubStats:d.d},t))(Object(n.a)(async t=>{let{fetchBootstrap:e,fetchConfig:a,fetchExternalPlugins:s,fetchExternalPluginInfo:c,fetchPluginHubStats:i,internalName:n}=t;await e(),await a(),await s(),await i(),await c(n)})(t=>{let{externalPlugin:e}=t;return e?Object(s.g)(l.a,null,Object(s.g)(b.a,{title:`${e.displayName} - Plugin Hub - ${g.a.title}`,description:e.description}),Object(s.g)("section",{id:"externalPlugins"},Object(s.g)("div",{class:"content-section dark-card pb-0"},Object(s.g)("div",{class:"card"},Object(s.g)("div",{class:"card-header card-body d-flex align-self-stretch"},Object(s.g)("div",{class:"mr-4 d-flex align-items-center"},Object(s.g)("img",{width:"36",alt:"",src:e.imageUrl?e.imageUrl:"/img/plugin-hub/missingicon.png"})),Object(s.g)("div",null,Object(s.g)("h5",{class:"card-title"},e.displayName),Object(s.g)("h6",{class:"card-subtitle mb-2 text-muted"},Object(s.g)("a",{href:"/plugin-hub/"+e.author},e.author)),e.count>0&&Object(s.g)("p",{class:"card-text"},Object(s.g)("span",{class:"badge badge-primary"},Object(h.f)(e.count)," ",e.count>1?"active installs":"active install")," ",e.installed&&Object(s.g)("span",{class:"badge badge-success"},"installed"))),Object(s.g)("div",{className:"ml-4 text-muted"},e.description),Object(s.g)("div",{className:"ml-auto"},Object(s.g)("a",{href:`https://github.com/${e.github.user}/${e.github.repo}/issues`},Object(s.g)("i",{class:"fab fa-github"}),Object(s.g)("span",null," Report an issue")))),e.github&&Object(s.g)("div",{class:"card-body markdown-body"},Object(s.g)(f.a,{tagName:"div",html:e.github.readme})))))):Object(s.g)(j.a,null)}))}}]);
//# sourceMappingURL=13.a0831f4e.chunk.js.map