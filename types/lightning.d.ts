declare module 'lightning/platformResourceLoader' {
    export function loadStyle(context: any, resourceUrl: string): Promise<void>;
    export function loadScript(context: any, resourceUrl: string): Promise<void>;
}