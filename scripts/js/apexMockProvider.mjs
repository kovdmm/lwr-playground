import path from 'path';
import fs from 'fs';

export default function apexMockProvider() {
    return {
        name: 'apex-mock-provider',
        type: 'module-provider',
        async getModuleEntry({ specifier, config }) {
            if (!specifier.startsWith('@salesforce/apex/')) {
                return null; // не наш namespace
            }

            // @salesforce/apex/ApexController.doSomething
            const [controller, method] = specifier
                .replace('@salesforce/apex/', '')
                .split('.');

            if (!controller || !method) {
                throw new Error(`Invalid Apex specifier: ${specifier}`);
            }

            const rootDir = process.cwd();
            const filePath = path.join(
                rootDir,
                'src',
                'apex-mocks',
                controller,
                `${method}.js`
            );

            if (!fs.existsSync(filePath)) {
                throw new Error(
                    `[apex-mock-provider] Mock not found: ${filePath}`
                );
            }

            return {
                specifier,
                moduleRecord: {
                    specifier,
                    namespace: false,
                    entry: filePath,
                },
            };
        },
    };
}
