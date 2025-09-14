---
published: 2025-08-26
draft: false
title: 'How I Built `mc-router`: An Enterprise-Ready Minecraft Proxy in Under 4 Hours'
description: 'A deep dive into the rapid development of `mc-router`, a high-performance Minecraft proxy built with Rust, designed for multi-tenant hosting environments.'
tags: ['minecraft', 'proxy', 'rust']
series: 'Minecraft for Enterprises'
---

In just 3 hours and 38 minutes, I built [`mc-router`](https://github.com/CloudinatorMC/mc-router) an enterprise-ready Minecraft ingress proxy designed to handle incoming connections and route them to the right backend servers. It ships with native multi-tenant support, HAProxy protocol, UDP forwarding, and even a draft cloud configuration API.

I've been trying to find a good Minecraft proxy for ingress traffic for a while now, but I've come to the conclusion that none were designed for multi-tenancy hosting environments natively - *unless you workaround with your own custom plugins*.

## Why Build a New Proxy?

Existing Minecraft proxies are not designed for ingress, instead focusing on transferring of players to different servers mid-game. This limitation prompted the need for a new solution that could handle incoming connections efficiently while providing advanced features like cloud config synchronisation and TLS tunnelling.

Existing solutions that I evaluated:

1. BungeeCord - The original Minecraft proxy, known for its simplicity and ease of use. However, it lacks advanced features like TLS tunnelling and cloud configuration synchronisation.
2. Gate - A modern Minecraft proxy written in Go, offering better performance than BungeeCord. Gate in Lite mode is a good option for single IP but multi-server setups, but it still lacks TLS tunnelling and cloud configuration synchronisation.
3. Velocity - It is a popular Minecraft proxy known for its performance and scalability often utilised to allow players to switch between different worlds (each with a different backend server) mid-game. However, it lacks built-in support for TLS tunnelling and cloud configuration synchronisation.
4. Waterfall - A fork of BungeeCord, designed to be more stable and performant. However, it still lacks advanced features like TLS tunnelling and cloud configuration synchronisation.

## Introducing `mc-router`

[`mc-router`](https://github.com/CloudinatorMC/mc-router) is a high-performance Minecraft proxy built with Rust, designed to handle incoming connections and route them to the appropriate backend servers.

Existing implemented features:
1. Routing based on the [Handshake packet](https://minecraft.wiki/w/Java_Edition_protocol/Packets#Handshake) - Allows routing players to different backend servers based on the hostname they use to connect.
2. HAProxy Protocol v1 support - Allows passing the original client's IP address to the backend game server, which is crucial for logging and player management.
3. Optional UDP packet routing - Supports routing UDP packets, which is essential for a few Minecraft mods.
4. A config service API draft - Once completed, this will allow dynamic configuration of the proxy via a RESTful API secured with ed25519 keys.

Upcoming features:
1. TLS tunnelling - Enables secure connections to the backend game servers, enhancing security and privacy.
2. Full cloud config synchronisation - Allows the proxy to synchronise its configuration with a central cloud service, making it easier to manage multiple proxies.
... and a [public roadmap](https://github.com/orgs/CloudinatorMC/projects/1) with more features to come!

## Building `mc-router` in Under 4 Hours

The development of [`mc-router`](https://github.com/CloudinatorMC/mc-router) was a sprint, just 3 hours and 38 minutes from empty repo to a working proxy. Here’s how it unfolded:

1. **Kickoff (16:43)** — [Commit 84ae854](https://github.com/CloudinatorMC/mc-router/commit/84ae8541418c0eb75439ef71a973b1addaf607c5) with just a README and license. I wanted a clean structure before diving into features.
2. **Core Routing & UDP (18:05)** — [Commit d2de8e7](https://github.com/CloudinatorMC/mc-router/commit/d2de8e7716e1baf61f2f049ae3f8d6ae1fdd3d13) added the first working code: modular routing based on the Minecraft handshake, plus UDP forwarding to support certain mods. At this point, `mc-router` could already pass traffic end-to-end.
3. **Real-World Usability (18:24)** — [Commit 615f31b](https://github.com/CloudinatorMC/mc-router/commit/615f31b6ba7a3259ffd75bbc22329d8a1956ed2d) added HAProxy protocol support, so backend servers see the original client IPs. I also refined the config format to make the proxy easier to operate.
4. **Toward the Cloud (20:21)** — [Commit ef4a554](https://github.com/CloudinatorMC/mc-router/commit/ef4a554bb99391873df0a7cd80fb24561513b7de) implemented the first draft of the config service API. This was the leap from "just a proxy" to "cloud-ready infrastructure."

## Conclusion

The real story isn’t just [`mc-router`](https://github.com/CloudinatorMC/mc-router) itself, it’s the speed at which it was built, the project took approximately 3 hours and 38 minutes from start to finish. The rapid development was made possible by leveraging GPT-5 to assist with coding tasks, allowing for quick iteration and problem-solving.

> Enterprise-ready infrastructure software has traditionally required teams of engineers and weeks of development. With AI-assisted workflows, a single developer can produce production-grade systems in a single afternoon.
> — ChatGPT, August 2025

In this scenario we can agree with ChatGPT's sentiment, as GPT-5 has proven it can undertake complex software development tasks efficiently. However, human oversight and expertise remain crucial to ensure the quality and reliability of the final product.

The journey isn’t finished, next up is TLS tunnelling and completing the config service API backend, bringing [`mc-router`](https://github.com/CloudinatorMC/mc-router) even closer to its goal of being a truly enterprise-ready ingress for Minecraft.
