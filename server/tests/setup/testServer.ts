import { spawn, ChildProcess } from 'child_process';
import { getCurrentEnvironment } from '../utils/environment';
import path from 'path';

let server: ChildProcess | null = null;

export async function startTestServer(): Promise<void> {
    return new Promise((resolve, reject) => {
        const env = getCurrentEnvironment();
        console.log(`Starting test server in ${env} environment...`);
        
        // Start the server directly with node
        const serverPath = path.resolve(__dirname, '../../src/server.ts');
        server = spawn('npx', ['ts-node', serverPath], {
            env: { 
                ...process.env, 
                NODE_ENV: env,
                API_PREFIX: '/api/v1'  // Add API prefix to match server configuration
            },
            stdio: 'inherit',
            shell: true
        });

        // Wait for server to start
        setTimeout(() => {
            console.log('Test server started');
            resolve();
        }, 3000);

        server.on('error', (err) => {
            console.error('Failed to start test server:', err);
            reject(err);
        });
    });
}

export async function stopTestServer(): Promise<void> {
    if (server) {
        console.log('Stopping test server...');
        server.kill();
        server = null;
    }
}
