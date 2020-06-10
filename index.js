require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestBody'))

// Log the body of POST-requests
morgan.token('requestBody', function getRequestBody (request) {
    if (request.method === 'POST') {
        return JSON.stringify(request.body)
    }
    return null
})

// Get all persons
app.get('/api/persons', (request, response, next) => {
    //response.json(persons)
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

// Get person with id
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

// Delete person with id
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// Create new entry
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ 
            error: 'The request must include name and number' 
        })
    }
    //if ((persons.some(person => person['name'] === body.name))) {
    //    return response.status(400).json({ 
    //        error: 'Person with that name already exists' 
    //    })
    //}
    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

// Get info about persons
app.get('/info', (request, response) => {
    response.type('html')
    response.write(`<p>Phonebook has info for ${persons.length} people</p>`)
    response.write(`<p> ${new Date()} </p>`)
    response.end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})