import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';

export default class DemoComponent extends LightningElement {
    connectedCallback(): void {
        loadScript(this, `/mapbox/mapbox-gl.js`);
        loadStyle(this, `/mapbox/mapbox-gl.css`);
    }
}
