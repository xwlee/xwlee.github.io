"use strict";(self.webpackChunkminimal_blog=self.webpackChunkminimal_blog||[]).push([[688],{51254:function(t,e,n){var o=n(95318);e.__esModule=!0,e.default=void 0;var r=o(n(67154)),i=o(n(37316)),a=o(n(85354)),s=o(n(67294)),d=o(n(45697)),u=n(80989),l=(0,u.debounce)((function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})}),300,!1),c=function(t){function e(e){var n;return(n=t.call(this,e)||this).shortname="https-xwlee-github-io",n}(0,a.default)(e,t);var n=e.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(t){return this.props!==t&&(0,u.shallowComparison)(this.props,t)},n.componentDidUpdate=function(){this.loadInstance()},n.componentWillUnmount=function(){this.cleanInstance()},n.loadInstance=function(){window.document.getElementById("dsq-count-scr")?l():(0,u.insertScript)("https://"+this.shortname+".disqus.com/count.js","dsq-count-scr",window.document.body)},n.cleanInstance=function(){(0,u.removeScript)("dsq-count-scr",window.document.body),window.DISQUSWIDGETS=void 0},n.render=function(){var t=this.props,e=t.config,n=t.className,o=t.placeholder,a=(0,i.default)(t,["config","className","placeholder"]),d="disqus-comment-count"+(n?" "+n:"");return s.default.createElement("span",(0,r.default)({className:d,"data-disqus-identifier":e.identifier,"data-disqus-url":e.url},a),o)},e}(s.default.Component);e.default=c,c.defaultProps={placeholder:"..."},c.propTypes={config:d.default.shape({identifier:d.default.string,title:d.default.string,url:d.default.string}),placeholder:d.default.string,className:d.default.string}},19616:function(t,e,n){var o=n(95318);e.__esModule=!0,e.default=void 0;var r=o(n(67154)),i=o(n(37316)),a=o(n(85354)),s=o(n(67294)),d=o(n(45697)),u=function(t){function e(){return t.apply(this,arguments)||this}(0,a.default)(e,t);var n=e.prototype;return n.getSrc=function(){return"https://embed.disqus.com/p/"+Number(this.props.commentId).toString(36)+"?p="+(this.props.showParentComment?"1":"0")+"&m="+(this.props.showMedia?"1":"0")},n.render=function(){var t=this.props,e=(t.commentId,t.showMedia,t.showParentComment,(0,i.default)(t,["commentId","showMedia","showParentComment"]));return s.default.createElement("iframe",(0,r.default)({src:this.getSrc(),width:this.props.width,height:this.props.height,seamless:"seamless",scrolling:"no",frameBorder:"0",title:"embedded-comment"},e))},e}(s.default.Component);e.default=u,u.defaultProps={width:420,height:320,showMedia:!0,showParentComment:!0},u.propTypes={commentId:d.default.oneOfType([d.default.number,d.default.string]).isRequired,width:d.default.number,height:d.default.number,showMedia:d.default.bool,showParentComment:d.default.bool}},32605:function(t,e,n){var o=n(95318);e.__esModule=!0,e.default=void 0;var r=o(n(67154)),i=o(n(37316)),a=o(n(85354)),s=o(n(67294)),d=o(n(45697)),u=n(80989),l=function(t){function e(e){var n;return(n=t.call(this,e)||this).shortname="https-xwlee-github-io",n.embedUrl="https://"+n.shortname+".disqus.com/embed.js",n}(0,a.default)(e,t);var n=e.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(t){return this.props!==t&&(0,u.shallowComparison)(this.props,t)},n.componentDidUpdate=function(){this.loadInstance()},n.componentWillUnmount=function(){this.cleanInstance()},n.getDisqusConfig=function(t){return function(){this.page.identifier=t.identifier,this.page.url=t.url,this.page.title=t.title,this.page.remote_auth_s3=t.remoteAuthS3,this.page.api_key=t.apiKey,this.language=t.language}},n.loadInstance=function(){"undefined"!=typeof window&&window.document&&(window.disqus_config=this.getDisqusConfig(this.props.config),window.document.getElementById("dsq-embed-scr")?this.reloadInstance():(0,u.insertScript)(this.embedUrl,"dsq-embed-scr",window.document.body))},n.reloadInstance=function(){window&&window.DISQUS&&window.DISQUS.reset({reload:!0})},n.cleanInstance=function(){(0,u.removeScript)("dsq-embed-scr",window.document.body);try{delete window.DISQUS}catch(o){window.DISQUS=void 0}var t=window.document.getElementById("disqus_thread");if(t)for(;t.hasChildNodes();)t.removeChild(t.firstChild);var e=window.document.querySelector('[id^="dsq-app"]');if(e){var n=window.document.getElementById(e.id);n.parentNode.removeChild(n)}},n.render=function(){var t=this.props,e=(t.config,(0,i.default)(t,["config"]));return s.default.createElement("div",(0,r.default)({id:"disqus_thread"},e))},e}(s.default.Component);e.default=l,l.propTypes={config:d.default.shape({identifier:d.default.string,title:d.default.string,url:d.default.string,language:d.default.string,remoteAuthS3:d.default.string,apiKey:d.default.string})}},28200:function(t,e,n){var o=n(95318);var r=o(n(32605));e.h$=r.default,o(n(51254)).default,o(n(19616)).default,r.default},80989:function(t,e,n){var o=n(95318);e.__esModule=!0,e.insertScript=function(t,e,n){var o=window.document.createElement("script");return o.async=!0,o.src=t,o.id=e,n.appendChild(o),o},e.removeScript=function(t,e){var n=window.document.getElementById(t);n&&e.removeChild(n)},e.debounce=function(t,e,n){var o;return function(){for(var r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];var s=this,d=function(){o=null,n||t.apply(s,i)},u=n&&!o;window.clearTimeout(o),o=setTimeout(d,e),u&&t.apply(s,i)}},e.isReactElement=a,e.shallowComparison=function t(e,n){var o,i=new Set(Object.keys(e).concat(Object.keys(n))),s=(o=[]).concat.apply(o,(0,r.default)(i)).filter((function(o){if("object"==typeof e[o]){if(t(e[o],n[o]))return!0}else if(e[o]!==n[o]&&!a(e[o]))return!0;return!1}));return 0!==s.length};var r=o(n(319)),i=o(n(67294));function a(t){return!!i.default.isValidElement(t)||!!Array.isArray(t)&&t.some((function(t){return i.default.isValidElement(t)}))}},24073:function(t,e,n){n.r(e),n.d(e,{default:function(){return m}});var o=n(67294),r=n(70977),i=n(35510),a=n(92102),s=n(97274),d=n(73168),u=n(84829),l=n(28200),c=function(t){var e=t.post,n={url:""+e.canonicalUrl,identifier:e.slug,title:e.title};return o.createElement(o.Fragment,null,o.createElement(l.h$,{config:n}))},f=["32px","16px","8px","4px"].map((function(t){return"rgba(0, 0, 0, 0.15) 0px "+t+" "+t+" 0px"})),p=function(t){var e,n,l,p=t.data.post;return(0,r.tZ)(s.Z,null,(0,r.tZ)(u.Z,{title:p.title,description:p.description?p.description:p.excerpt,image:p.banner?null===(e=p.banner)||void 0===e||null===(n=e.childImageSharp)||void 0===n||null===(l=n.resize)||void 0===l?void 0:l.src:void 0,pathname:p.slug,canonicalUrl:p.canonicalUrl}),(0,r.tZ)(i.X6,{as:"h1",variant:"styles.h1"},p.title),(0,r.tZ)("p",{sx:{color:"secondary",mt:3,a:{color:"secondary"},fontSize:[1,1,2]}},(0,r.tZ)("time",null,p.date),p.tags&&(0,r.tZ)(o.Fragment,null," — ",(0,r.tZ)(d.Z,{tags:p.tags})),p.timeToRead&&" — ",p.timeToRead&&(0,r.tZ)("span",null,p.timeToRead," min read")),(0,r.tZ)("section",{sx:{my:5,".gatsby-resp-image-wrapper":{my:[4,4,5],boxShadow:f.join(", ")},variant:"layout.content"}},(0,r.tZ)(a.MDXRenderer,null,p.body)),(0,r.tZ)(c,{post:p}))};var m=function(t){var e=Object.assign({},t);return o.createElement(p,e)}},73168:function(t,e,n){var o=n(4942),r=n(70977),i=n(67294),a=n(1597),s=n(99105),d=n(90944);function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}e.Z=function(t){var e=t.tags,n=(0,s.Z)(),l=n.tagsPath,c=n.basePath;return(0,r.tZ)(i.Fragment,null,e.map((function(t,e){return(0,r.tZ)(i.Fragment,{key:t.slug},!!e&&", ",(0,r.tZ)(a.Link,{sx:function(t){var e;return function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){(0,o.Z)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},null===(e=t.styles)||void 0===e?void 0:e.a)},to:(0,d.Z)("/"+c+"/"+l+"/"+t.slug)},t.name))})))}}}]);
//# sourceMappingURL=component---node-modules-lekoarts-gatsby-theme-minimal-blog-core-src-templates-post-query-tsx-45ef97a8f17cb7b2bc7b.js.map