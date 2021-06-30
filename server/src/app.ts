import express from 'express'
import cors from 'cors'
import { connect, set as mongooseSet } from 'mongoose'
import errorMiddleware from '@middlewares/error.middleware'
import FeatureToggleRoute from '@components/feature-toggle/feature-toggle.route'
import CustomerRoute from '@components/customer/customer.route'
import FeatureRoute from '@components/feature/feature.route'

export default class App {
    private readonly port = process.env.PORT || 3000
    private readonly env = process.env.NODE_ENV || 'development'
    private readonly dbHost = process.env.MONGO_HOST || 'localhost'
    private readonly dbPort = process.env.MONGO_PORT || '27017'
    private readonly dbName = process.env.MONGO_DATABASE || 'mongoose'
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

    private async connectToDatabase() {
        if (this.env !== 'production') {
            mongooseSet('debug', true)
        }

        try {
            await connect(this.mongoDbConfig.url, this.mongoDbConfig.options)
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Error while connectong to MongoDB:', e)
        }
    }

    private initializeMiddlewares() {
        if (this.env === 'production') {
            this.app.use(cors({ origin: 'http://localhost' }))
        } else {
            this.app.use(cors({ origin: 'http://localhost:4200' }))
        }
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