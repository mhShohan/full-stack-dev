const http = require('http');
const fs = require('fs');

const sendResponse = (res, {
    contentType = 'application/json',
    status = 200,
    body = {}
}) => {
    res.writeHead(status, { contentType: contentType });
    res.write(JSON.stringify(body));
    res.end();
};

const routes = {
    '/': {
        GET: (_req, res) => {
            sendResponse(res, { body: { msg: 'Server is running' } });
        }
    },
    '/students': {
        GET: (_req, res) => {
            const studentsString = fs.readFileSync('./db/data.json');

            sendResponse(res, { body: JSON.parse(studentsString) });
        },
        POST: (req, res) => {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                const payload = JSON.parse(body);

                const studentsString = fs.readFileSync('./db/data.json');
                const students = JSON.parse(studentsString);

                students.push(payload);

                fs.writeFileSync('./db/data.json', JSON.stringify(students));

                sendResponse(res, { status: 201, body: students });
            });
        }
    },
    default: (_req, res) => {
        sendResponse(res, { status: 404, body: { msg: 'Not Found!' } });
    }
};

const server = http.createServer((req, res) => {
    const { url, method } = req;
    const currentRoute = routes[url] || routes.default;
    const handler = currentRoute[method] || routes.default;

    handler(req, res);
});

server.listen(4000, () => {
    console.log('server is listing 4000');
});