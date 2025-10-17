import { type LightningElement } from "lwc";

const patchElementWithStylesheet = (element: Element | null, resourceUrl: string) => {
    if (!element) {
        return;
    }
    if (!element.querySelector(`link[href="${resourceUrl}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = resourceUrl;
        element.appendChild(link);
    }
}

export const loadStyle = async (cmp: LightningElement, url: string) => {
    patchElementWithStylesheet(cmp.template as never, url);
    await new Promise(resolve => setTimeout(resolve, 200));
};