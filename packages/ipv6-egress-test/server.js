const http = require('http')
const https = require('https')

const port = process.env.PORT || 3000

// api6.ipify.org only has an AAAA record (no A record), so this request
// can only succeed if the container actually has outbound IPv6 connectivity.
const IPV6_ONLY_HOST = 'https://api6.ipify.org'

function checkIpv6Egress() {
    return new Promise((resolve) => {
        const req = https.get(IPV6_ONLY_HOST, { timeout: 5000 }, (res) => {
            let body = ''
            res.on('data', (chunk) => { body += chunk })
            res.on('end', () => resolve({ ok: true, address: body.trim() }))
        })
        req.on('timeout', () => req.destroy(new Error('Request timed out')))
        req.on('error', (err) => resolve({ ok: false, error: err.message }))
    })
}

http.createServer(async (req, res) => {
    const result = await checkIpv6Egress()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ target: IPV6_ONLY_HOST, ...result }) + '\n')
}).listen(port, () => console.log(`Listening on ${port}`))
