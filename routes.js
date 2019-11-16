import { Router } from 'express'
import axios from 'axios'

export default (container) => {
	const routes = Router()

	routes.get('/', (req, res) => res.send('Hello World!'))

	routes.get('/todo', (req, res) => {
		axios({
			url: 'https://jsonplaceholder.typicode.com/todos/1'
		})
			.then((response) => {
				// console.log(response.data)
				res.json({
					todo: response.data,
				})				
			})
			.catch((err) => {
				res.status(500).json({
					error: true
				})
			})
	})

	return routes
}
