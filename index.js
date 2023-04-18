const express = require('express')
const port = 3000
const app = express()
const uuid = require('uuid')
app.use(express.json())


/*
        - Query params => meusite.com/users?nome=eduarda&age=29 // FILTROS
        - Route params => /users/2    // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
        - Request Body => { "name":"Eduarda" , "age":}
        -GET            => Buscar informação no Back-end
        -POST           => Criar informação no Back-end
        -PUT            => Alterar/Atualizar informação no Back-end
        -DELETE         => Deletar informação no Back-end
        -Middleware     => interceptador - Tem o poder de parar ou alterar dados da requisição
 */


const firstMiddleware = (request, response, next) => {
    const { id } = request.params
    const index = newOrder.findIndex (costumer => costumer.id === id)

    if(index < 0){
        return response.status(404).json({ message: " User not found"})
    }
    request.orderIndex = index
    request.orderId = id
    next()

} 

const seccondMiddleware = (request, response, next) => {
    console.log(request.method)
    console.log(request.url)
    next()
}



const newOrder = []


app.post ('/order',seccondMiddleware, (request, response) => {
    const {order, clientName, price } = request.body
    // console.log (uuid)
    const costumer = {id: uuid.v4(), order, clientName, price, "status": "Em preparação" }
    newOrder.push(costumer)
    return response.status(201).json (costumer)
})


app.get ('/order', seccondMiddleware, (request, response) => {
    // console.log ('A rota foi chamada')
    return response.json(newOrder)
})

app.put ('/order/:id', firstMiddleware, seccondMiddleware, (request, response) => {
      
        const index = request.orderIndex
        const id = request.orderId
        const {order, clientName, price} = request.body
        const updatedOrder = {id, order, clientName, price, "status": "Em preparação"}
        newOrder[index] = updatedOrder
        return response.json(updatedOrder)
})


app.delete ('/order/:id',firstMiddleware, seccondMiddleware, (request, response) => {
    const index = request.orderIndex
    newOrder.splice (index,1)

    return response.status(204).json()

})


app.patch ('/order/:id',firstMiddleware, seccondMiddleware, (request, response) => {
    const index = request.orderIndex
    const order = newOrder[index]
    order.status = "Pronto"
    return response.json(order) 
})



app.get('/order/:id', firstMiddleware, seccondMiddleware, (request, response) => {
    const index = request.orderIndex

    return response.send(newOrder [index])
})



app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})