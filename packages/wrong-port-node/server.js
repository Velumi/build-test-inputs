/**
 * wrong-port-node: test app that listens on the wrong port by default.
 *
 * By default it listens on port 3001 (ignoring process.env.PORT), which causes
 * the platform readiness probe (which expects port 3000) to fail.
 *
 * When PORT=3001 is set in the environment, process.env.PORT === '3001', and
 * the app listens on 3001 — matching the platform's assumption, so the probe passes.
 *
 * Usage in tests:
 *   - Deploy without PORT → deployment fails (readiness probe timeout)
 *   - Add env var PORT=3001 → updateEnvironment triggers redeploy → deployment succeeds
 */

const http = require('http')

// Ignores process.env.PORT intentionally — always uses 3001 as the app port.
// The platform expects port 3000 by default, so the readiness probe will fail
// unless PORT=3001 is explicitly set in the environment (which tells the platform
// to probe on 3001 instead of 3000).
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001

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
