const url = require('url')
const mqtt = require('mqtt')
const logger = require('log-driver')({ level: 'info' })
const { Location, mongoose } = require('./db')

const handleError = (err) => {
  logger.error(err.message)
  logger.trace(err.stack)
  process.exit(1)
}

if (!process.env.MONGO_URL) {
  handleError(new Error('Missing MONGO_URL'))
}

if (!process.env.MQTT_URL) {
  handleError(new Error('Missing MQTT_URL'))
}

const exec = async () => {
  logger.info('MongoDB Connecting')
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
  logger.info('MongoDB Connected')

  logger.info('MQTT Connecting')
  const { auth } = url.parse(process.env.MQTT_URL)

  const client = mqtt.connect(process.env.MQTT_URL, {
    username: auth ? auth.split(':')[0] : undefined,
    password: auth ? auth.split(':')[1] : undefined
  })

  client.on('error', handleError)

  client.on('connect', () => {
    logger.info('MQTT Connected')
    client.subscribe('owntracks/#')
  })

  client.on('message', (topic, message) => {
    logger.info('Storing: ' + message.toString())
    let latest = JSON.parse(message.toString())

    if (latest._type === 'location') {
      const location = new Location(latest)
      location.save()
    }
  })
}

exec().catch(handleError)
