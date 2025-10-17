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

export const loadStyle = async (cmp, url) => {
    patchElementWithStylesheet(cmp.template, url);
    await new Promise(resolve => setTimeout(resolve, 200));
};