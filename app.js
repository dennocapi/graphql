const express = require('express')
const app = express()
const PORT = 6969
const {
    graphqlHTTP
} = require('express-graphql')
const schema = require('./Schemas')

app.use(express.json())

app.use('/graphql', graphqlHTTP({
    schema,
    graphql: true
}))

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
// const pusher = ()=>{
//     UserData.push({
//         id: 1001,
//         first_name: 'args.first_name',
//         last_name: 'args.last_name',
//         email: 'args.email'
//     })
//     console.log(UserData[1000])
// }

// pusher()
