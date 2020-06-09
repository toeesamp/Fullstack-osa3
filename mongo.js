const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://karvasipuli:${password}@cluster0-sbssa.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length===3) {
    Person
        .find({})
        .then(persons => {
            console.log('phonebook:')
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
  })
} else if (process.argv.length<5){
    console.log('No number specified')
    mongoose.connection.close()
    process.exit(1)
} else {
    const person = new Person({
        name: `${process.argv[3]}`,
        number: `${process.argv[4]}`
    })
    
    person.save().then(response => {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
}

