require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestBody'))

// Log the body of POST-requests
morgan.token('requestBody', function getRequestBody (request) {
    if (request.method === 'POST') {
        return JSON.stringify(request.body)
    }
    return null
})

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-1234567",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "asd",
        "number": "12",
        "id": 5
    }
]

const generateId = () => {
    return getRandomInt(9001)
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

// Get all persons
app.get('/api/persons', (request, response) => {
    //response.json(persons)
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// Get person with id
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// Delete person with id
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

// Create new entry
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'The request must include name and number' 
        })
    }
    if ((persons.some(person => person['name'] === body.name))) {
        return response.status(400).json({ 
            error: 'Person with that name already exists' 
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person)
    response.json(person)
})

// Get info about persons
app.get('/info', (request, response) => {
    response.type('html')
    response.write(`<p>Phonebook has info for ${persons.length} people</p>`)
    response.write(`<p> ${new Date()} </p>`)
    response.end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})