var t=Symbol("observedSlotElement"),e=Symbol("slotElementObserver"),s=Symbol("startObserving");function a(a,o="#slot"){return class extends a{constructor(){super(...arguments),this.slotHasContent=!1}manageObservedSlot(){if(this[t]=this[t]||(this.shadowRoot?this.shadowRoot.querySelector(o):void 0),this[t]){var e=this[t],s=e.assignedNodes?e.assignedNodes():[...this.childNodes].filter(t=>{return!t.hasAttribute("slot")});s=s.filter(t=>!!t.tagName||!!t.textContent&&t.textContent.trim()),this.slotHasContent=s.length>0,this.requestUpdate()}}firstUpdated(t){super.firstUpdated(t),this.manageObservedSlot()}[s](){if(!this[e]){this[e]=new MutationObserver(t=>{for(var e of t)"characterData"===e.type&&this.manageObservedSlot()})}this[e].observe(this,{characterData:!0,subtree:!0})}connectedCallback(){super.connectedCallback(),this[s]()}disconnectedCallback(){this[e]&&this[e].disconnect(),super.disconnectedCallback()}}}export{a as O};
//# sourceMappingURL=observe-slot-text-5194cee4.js.map