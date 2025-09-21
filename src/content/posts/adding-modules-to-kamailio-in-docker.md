---
published: 2025-09-21
draft: true
title: 'Adding Modules to Kamailio in Docker'
description: 'A guide to adding and configuring additional modules in a Kamailio SIP server running in a Docker container.'
tags: ['kamailio', 'docker', 'sip', 'voip']
series: 'Kamailio Tutorials'
---

In a [previous post](./using-unifi-talk-with-a-kamilio-sip-trunk), I discussed setting up a Kamailio SIP trunk for use with UniFi Talk. However, the default Kamailio Docker image comes with a limited set of modules. To unlock more functionality, we need to add additional modules.

## Creating a Custom Docker Image

We need to create a custom Dockerfile that extends a Alpine image and installs the required modules.

Open your text editor and create a new file named `Dockerfile` with the following content:

```Dockerfile title="Dockerfile"
FROM alpine:latest
RUN apk update && apk add kamailio kamailio-tls kamailio-mysql kamailio-json
COPY kamailio.cfg /etc/kamailio/kamailio.cfg
COPY kamctlrc /etc/kamailio/kamctlrc
CMD ["kamailio", "-DD", "-E", "-e"]
```

This Dockerfile does the following:
1. Uses the latest Alpine image as the base.
2. Updates the package list and installs Kamailio along with additional modules: `kamailio-tls`, `kamailio-mysql`, and `kamailio-json` - you can add or remove any other modules as needed.
3. Copies a custom Kamailio configuration file (`kamailio.cfg`) into the container
4. Copies a custom Kamailio control file (`kamctlrc`) into the container - *usually needed for database configuration and provisioning.*
5. Sets the command to run Kamailio in the foreground with debug output.

:::tip
If you're only using Docker Compose then you can skip the `COPY` commands and instead mount the configuration files as volumes in the `docker-compose.yml` file.
:::

### Why do we use Alpine?

Alpine is a minimal Docker image that is lightweight and secure. It reduces the overall size of the Docker image, making it faster to download and deploy.

Furthermore, Alpine's package manager, `apk`, makes it easy to install additional software packages, including Kamailio and its modules - which I've found using the official Kamailio image can be quite complicated to add extra modules to [see my struggles here](https://github.com/ajh123/homelab/commits/main/?since=2025-06-18&until=2025-06-25).

## Running the Custom Image

We can borrow the `docker-compose.yml` file from the previous post, but we need to update the image to use our custom image.

```yaml title="docker-compose.yml"
services:
  kamailio:
    build: .
    ports:
      - 5060:5060
      - 5060:5060/udp
    volumes:
      - ./kamailio.cfg:/etc/kamailio/kamailio.cfg
      - ./kamctlrc:/etc/kamailio/kamctlrc
```

:::important
Make sure to place the `Dockerfile`, `docker-compose.yml`, `kamailio.cfg`, and `kamctlrc` files in the same directory.
:::

Now, you can build and run the custom Kamailio image with Docker Compose:

```bash
docker-compose up -d --build
```

This command will build the Docker image based on the Dockerfile and start the Kamailio container in detached mode.

## Check if the container is working

You can check the logs of the Kamailio container to ensure it is running correctly:

```bash
docker-compose logs -f kamailio
```

You should see Kamailio starting up and listening on the specified ports.