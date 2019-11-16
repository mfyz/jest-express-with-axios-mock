import express from 'express'
import bodyParser from 'body-parser'
import request from 'supertest'
import * as axios from "axios"

import routes from '../routes'

jest.mock('axios')

describe('Test express endpoints with mocking axios', () => {
	const app = express()
	app.use(bodyParser.json())
	app.use(routes())

	it('GET /todo should return http 200 and todo object', async (done) => {
		axios.mockImplementation(() => Promise.resolve({
			data: {
				id: 1,
				title: 'test mock todo',
				completed: false
			}
		}))

		const res = await request(app)
			.get('/todo')
			.expect('Content-Type', /json/)
			.expect(200)
		expect(res.body.todo.id).toEqual(1)
		expect(res.body.todo.title.length > 0).toBe(true)
		expect(res.body.todo.completed).toBe(false)
		done()
	})

	it('GET /todo should return http 500 and error flag true when its API call fails', async (done) => {
		axios.mockImplementation(() => Promise.reject())

		const res = await request(app)
			.get('/todo')
			.expect('Content-Type', /json/)
			.expect(500)
		expect(res.body.error).toBe(true)
		done()
	})

})
