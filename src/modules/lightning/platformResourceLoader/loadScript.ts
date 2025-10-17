const patchElementWithScript = (element: Element, scriptUrl: string) => {
    if (!element) {
        return;
    }
    if (!element.querySelector(`script[src="${scriptUrl}`)) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        element.appendChild(script);
    }
}

export const loadScript = async (_, url) => {
    patchElementWithScript(document.body, url);
    await new Promise(resolve => setTimeout(resolve, 200));
};