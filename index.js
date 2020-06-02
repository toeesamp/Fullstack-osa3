const express = require('express')
const app = express()

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

app.get('/', (req, res) => {
    res.send('<h1>Hello!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    console.log('request ',req.headers)
    console.log('response ',res)
    res.type('html')
    res.write(`<p>Phonebook has info for ${persons.length - 1} people</p>`)
    res.write(`<p> ${new Date()} </p>`)
    res.end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})