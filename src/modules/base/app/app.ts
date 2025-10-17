import { LightningElement } from "lwc";
import "@lwc/synthetic-shadow";
import doSomething from "@salesforce/apex/ApexController.doSomething";

const SLDS_URL = '/public/slds/assets/styles/salesforce-lightning-design-system.min.css';
const BASE_STYLE_URL = '/public/assets/style.css';

(function patchCustomElementsDefine() {
    const origDefine = customElements.define;
    customElements.define = (name, ctor, options) => {
        const origConnected = ctor.prototype.connectedCallback;

        if (!name.startsWith('lightning-')) {
            ctor.prototype.connectedCallback = function () {
                patchElementWithStylesheet(this.shadowRoot, SLDS_URL);
                if (origConnected) {
                    return origConnected.call(this);
                }
            };
            console.log(`Patched ${name} with SLDS`);
        }

        return origDefine.call(customElements, name, ctor, options);
    };
})();

const patchElementWithStylesheet = (element: Element, stylesheetUrl: string) => {
    if (!element) {
        return;
    }
    if (!element.querySelector(`link[href="${stylesheetUrl}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = stylesheetUrl;
        element.appendChild(link);
    }
}

export default class App extends LightningElement {
    async connectedCallback() {
        patchElementWithStylesheet(document.head, SLDS_URL);
        patchElementWithStylesheet(document.head, BASE_STYLE_URL);
        console.log(await doSomething());
    }
}
