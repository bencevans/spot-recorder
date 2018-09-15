# spot-recorder

> OwnTracks MQTT to MongoDB Recorder

## docker

Pull

    docker pull bencevans/spot-recorder

Run

    docker run \
      -e MONGO_URL=XXXX \
      -e MQTT_URL=XXXX \
      --restart always \
      bencevans/spot-recorder
