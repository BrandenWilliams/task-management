const express = require(`express`);

const app = express();

app.use(express.json());

// Account api routes
app.use('/api/accounts', require(`./api/accounts`))

// Tasks api routes
app.use('/api/tasks', require(`./api/tasks`))

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
