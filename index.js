const express = require('express')
const app = express()

app.use(express.json()) 

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

app.get('/', (request, response) => {
    response.send('<h1>Hello!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

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

app.get('/info', (request, response) => {
    console.log('request ',request.headers)
    console.log('response ',response)
    response.type('html')
    response.write(`<p>Phonebook has info for ${persons.length - 1} people</p>`)
    response.write(`<p> ${new Date()} </p>`)
    response.end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})