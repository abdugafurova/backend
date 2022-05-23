import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import { graphqlUploadExpress } from 'graphql-upload'
import schema from './modules/index.js'
import express from 'express'
import http from 'http'
import cors from 'cors'
import path from 'path'
import './config.js'


const ip = '192.168.3.209'


;(async function () {
    const app = express()
    const httpServer = http.createServer(app)

    app.use(cors())
    app.use(graphqlUploadExpress())
    app.use(express.static(path.join(process.cwd(), 'uploads')))

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
            ApolloServerPluginDrainHttpServer({ httpServer })
        ],
    })

    await server.start()
    server.applyMiddleware({ app, path: '/graphql' })

    await new Promise(resolve => httpServer.listen({ port: process.env.PORT }, resolve))
    console.log(`🚀 Server ready at http://${ip}:${process.env.PORT}${server.graphqlPath}`)
})()