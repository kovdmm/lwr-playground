import { LightningElement, api } from "lwc";

const IS_IN_APP_BUILDER = window.location.href.includes("flexipageEditor");

export default class AppBuilderStub extends LightningElement {
    @api parentName;

    isInAppBuilder = IS_IN_APP_BUILDER;
}
