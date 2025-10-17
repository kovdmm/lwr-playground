#!/usr/bin/env node

// NOTE:
//   An alternative would be to patch the connectedCallback of <lightning-primitive-icon> at runtime
//   (e.g., from app.ts) to replace the `src` value dynamically.
//   However, that approach prevents SLDS styling classes from applying correctly,
//   causing the icon to render as plain white.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const targetFile = resolve('./node_modules/lightning-base-components/src/lightning/primitiveIcon/primitiveIcon.js');

if (!existsSync(targetFile)) {
    console.error('[ERROR] Target file not found:', targetFile);
    process.exit(1);
}

let content = readFileSync(targetFile, 'utf8');

const oldGetter = `get href() {
        return this.src || '';
    }`;

const newGetter = `get href() {
        if (this.src) return this.src;
        if (this.iconName) {
            const [sprite, name] = this.iconName.split(':');
            return '/public/slds/assets/icons/' + sprite + '-sprite/svg/symbols.svg#' + name;
        }
        return '';
    }`;

if (content.includes(oldGetter)) {
    content = content.replace(oldGetter, newGetter);
    writeFileSync(targetFile, content, 'utf8');
    console.log('[DONE] Patched primitiveIcon.js (href getter updated)');
} else {
    console.warn('[WARN] Expected href getter not found, file may have changed');
}