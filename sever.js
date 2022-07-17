import express from 'express';
import path from 'path';

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/Client'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/Client/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);