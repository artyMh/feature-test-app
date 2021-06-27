import express from 'express'
import cors from 'cors'
import { connect, set as mongooseSet } from 'mongoose'
import errorMiddleware from '@middlewares/error.middleware'
import FeatureToggleRoute from '@components/feature-toggle/feature-toggle.route'
import CustomerRoute from '@components/customer/customer.route'
import FeatureRoute from '@components/feature/feature.route'

// TODO: add logger, incoming data validations

export default class App {
    private readonly port = process.env.PORT || 3000
    private readonly env = process.env.NODE_ENV || 'development'
    private readonly dbHost = process.env.DB_HOST || 'localhost'
    private readonly dbPort = process.env.DB_PORT || '27017'
    private readonly dbName = process.env.DB_NAME || 'mongoose'
    private readonly mongoDbConfig = {
        url: `mongodb://${this.dbHost}:${this.dbPort}/${this.dbName}`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    }
    private readonly app = express()
    private readonly featureToggleRoute = new FeatureToggleRoute()
    private readonly customerRoute = new CustomerRoute()
    private readonly featureRoute = new FeatureRoute()

    constructor() {
        this.connectToDatabase()
        this.initializeMiddlewares()
        this.initializeRoutes()
        this.initializeErrorHandling()
    }

    listen() {
        // eslint-disable-next-line no-console
        this.app.listen(this.port, () => console.log(`App listening port ${this.port}`))
    }

    private connectToDatabase() {
        if (this.env !== 'production') {
            mongooseSet('debug', true)
        }

        connect(this.mongoDbConfig.url, this.mongoDbConfig.options)
    }

    private initializeMiddlewares() {
        this.app.use(cors({ origin: 'http://localhost:4200' }))
        this.app.use(express.json())
    }

    private initializeRoutes() {
        this.app.use('/api', this.featureToggleRoute.router)
        this.app.use('/api', this.customerRoute.router)
        this.app.use('/api', this.featureRoute.router)
        this.app.use(errorMiddleware)
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }
}
