/**
 * wrong-port-node: test app that listens on the wrong port by default.
 *
 * By default it listens on port 3001, which causes the platform readiness probe
 * (which expects port 3000 via the Dockerfile ENV PORT=3000) to fail.
 *
 * The fix: set APP_PORT=3000 in the environment. The app then listens on 3000,
 * matching the platform's probe. We use APP_PORT (not PORT) because the Dockerfile
 * always injects PORT=3000 via ENV, so overriding PORT from outside has no effect.
 *
 * Usage in tests:
 *   - Deploy without APP_PORT → deployment fails (readiness probe timeout)
 *   - Add env var APP_PORT=3000 → updateEnvironment triggers redeploy → deployment succeeds
 */

const http = require('http')

// Read APP_PORT — if not set, fall back to 3001 (wrong port, probe will fail).
// PORT is always 3000 (injected by Dockerfile ENV), so we don't use it here.
const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3001

const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 'ok', port }))
        return
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(`wrong-port-node running on port ${port}\n`)
})

server.listen(port, () => {
    console.log(`wrong-port-node listening on port ${port}`)
})
