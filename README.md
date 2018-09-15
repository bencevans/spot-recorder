# spot-recorder

> OwnTracks MQTT to MongoDB Recorder

## npm

Install

    npm install -g @bencevans/spot-recorder

Run

    MONGO_URL=XXXXX MQTT_URL=XXXXX spot-recorder

## docker

Pull

    docker pull bencevans/spot-recorder

Run

    docker run \
      -e MONGO_URL=XXXX \
      -e MQTT_URL=XXXX \
      --restart always \
      bencevans/spot-recorder
