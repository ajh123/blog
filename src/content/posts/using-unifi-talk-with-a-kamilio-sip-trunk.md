---
published: 2025-06-21
draft: false
title: 'Using UniFi Talk with a Kamailio SIP Trunk'
description: 'A guide to setting up a Kamailio SIP trunk for use with UniFi Talk, enabling a non-PSTN environment for testing and experimentation.'
tags: ['unifi-talk', 'kamailio', 'sip', 'voip', 'docker']
series: 'Simulating the PSTN'
---

In recent days, I’ve been experimenting with UniFi Talk and wanted a SIP trunk that’s not part of the PSTN - something I could *play with without limitations*.

### What Is a SIP Trunk?

A **SIP trunk** is a connection to a SIP provider that handles inbound and outbound call routing - traditionally to and from the PSTN.

To simulate that environment, we’ll need to create a local SIP provider.

### What Does a SIP Provider Do?

- Routes calls between multiple SIP endpoints or trunks
- Allocates numbers (DIDs) to subscribers
- Authenticates users and prevents number hijacking

### Why Kamailio?

Kamailio can handle all of these roles - it's an open-source SIP server designed for flexibility and scalability.

## Setting Up Kamailio

We'll run Kamailio using Docker Compose with a minimal config.

**`docker-compose.yml`:**

```yaml
services:
  kamailio:
    image: ghcr.io/kamailio/kamailio:6.0.1-noble
    ports:
      - 5060:5060
      - 5060:5060/udp
    volumes:
      - ./kamailio.cfg:/etc/kamailio/kamailio.cfg
```

There are two important things here:
1. Port 5060 TCP+UDP is used for SIP traffic
2. A `kamailio.cfg` file needs to be create alongside the docker compose file

My basic [Kamailio config](https://github.com/nickvsnetworking/kamailio-101-tutorial/blob/master/Kamailio%20101%20-%20Part%206%20-%20Reusing%20Code) is actually borrowed from NickVsNetworking who has a great [tutorial series on Kamailio configuration](https://nickvsnetworking.com/tag/kamailio-101/)

## Configuring UniFi Talk

Firstly we need to make sure the Static Signalling port is enabled:
1. Go to: `Talk` > `Settings` > `System` > `General`
2. Then tick the box `Static Signalling Port`, any number is fine but `6767` is the default.
3. Make sure to [appropriately forward this port](https://help.ui.com/hc/en-us/articles/18020323453847-Adding-a-Third-Party-SIP-Provider-to-UniFi-Talk#4)

Finally we can now configure the SIP trunk:
1. Go to: `Talk` > `Settings` > `System` > `Third-party SIP`
2. `Create New`
3. Set `Provider` to `Custom`
4. Set the provider name to whatever you want.
5. Add the custom fields:

| Field Name      | Value |
| --------------- | ----- |
| `proxy`         | Kamailio IP or domain |
| `realm`         | Same as proxy |
| `domain`        | Same as proxy |
| `dtmfmode`      | `rfc2833` |
| `password`      | Any placeholder (or real password if using auth) |
| `register`      | `true` |
| `username`      | Your E.164 phone number |
| `extension`     | `auto_to_user` |
| `from-domain`   | `location` |
| `auth-username` | Same as username |

>  UniFi Talk expects E.164-format numbers for proper routing.
For isolated, non-PSTN use, I recommend numbers like `+999xxxxxxxx` as `+999` is reserved for testing and documentation.

6. Add your phone number in the `Phone Numbers` list.
7. Add the IP addresses of your Kamailio server in to the `IP Address Range`, if you have a single IP you can use /32 in your range.

## Conclusion

You now have a fully functional, non-PSTN SIP trunk integrated into UniFi Talk.
All calls will route through Kamailio just like a real SIP provider - but with no subscription, no upstream carrier, and total control.

This setup lets you:
- Test call flows, IVRs, and voicemail
- Simulate users and devices
- Experiment with SIP signaling and Kamailio scripting
- Do it all without touching the real telephone network