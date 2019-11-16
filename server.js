import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import routes from './routes'

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use(routes())

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
