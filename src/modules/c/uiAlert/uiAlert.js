import { LightningElement, api } from "lwc";

const SUPPORTED_VARIANTS = ["info", "warning", "error", "offline"];

/** @typedef {"info"|"warning"|"error"|"offline"} AlertVariant */

export default class UiAlert extends LightningElement {
    @api message = "Default alert message";
    @api hideIcon = false;
    /** @type {string} */
    @api iconName;

    #variant = "info";
    @api get variant() {
        return this.#variant;
    }
    set variant(variant) {
        this.#variant = SUPPORTED_VARIANTS.includes(variant) ? variant : SUPPORTED_VARIANTS[0];
    }

    get styleClass() {
        return `slds-notify slds-notify_alert slds-alert_${this.variant} wrapper-text slds-m-bottom_x-small`;
    }

    get calculatedIconName() {
        return this.iconName ?? `utility:${this.variant}`;
    }

    get iconVariant() {
        if (["info", "error", "offline"].includes(this.variant)) {
            return "inverse";
        }
        return null;
    }
}
