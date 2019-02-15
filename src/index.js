import app from './App'
import config from '../config.json'

const port = process.env.PORT || config.port;

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    return console.log(`server is listening on ${port}`)
});

export default app;
