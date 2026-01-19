import { createRequire } from 'module';

const require = createRequire(import.meta.url);

let prisma;

try {
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();
} catch (error) {
    console.warn('⚠️ Prisma Client initialization failed. Using Mock Client.', error);

    // Create a robust Mock Client using Proxy to handle any model/method call without crashing
    const mockHandler = {
        get: (target, prop) => {
            if (prop === 'then') return undefined; // Not a promise

            // Return a function that logs and returns null/empty array
            return new Proxy(() => { }, {
                get: (funcTarget, funcProp) => {
                    if (funcProp === 'then') return undefined;
                    return async () => {
                        console.warn(`[MockDB] Call to ${String(prop)}.${String(funcProp)}`);
                        return null;
                    };
                },
                apply: (funcTarget, thisArg, args) => {
                    console.warn(`[MockDB] Method call on ${String(prop)}`);
                    return Promise.resolve(null);
                }
            });
        }
    };

    prisma = new Proxy({}, mockHandler);
}

export default prisma;
