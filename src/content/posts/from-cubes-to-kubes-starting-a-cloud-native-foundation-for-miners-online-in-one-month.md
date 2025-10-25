---
published: 2025-10-25
title: "From Cubes to Kubes: Starting a Cloud-Native Foundation for Miners Online in One Month"
description: "A journey of transforming Miners Online from a traditional server setup to a cloud-native architecture using Kubernetes in just one month, from scratch, making use of Agones, Shulker, and Minestom."
tags: ['kubernetes', 'cloud-native', 'minecraft', 'infrastructure', 'devops', 'minestom', 'agones', 'shulker']
series: "Miners Online Development"
---

Few projects in the tech world are as exhilarating and challenging as starting brand new cloud-native architecture from scratch. In this post, I will share my experience of transforming Miners Online, my Minecraft server running since 2017, from a traditional server setup to a cloud-native architecture with a prototype Kubernetes deployment all within the span of one month.

## The Beginning: Why Rebuild Everything?

For Miners Online, we have big plans for the future. The reasons are simple, to attract a player base we need something innovative, and interesting to offer.

The existing infrastructure, which consisted of:
- multiple repositories for each game and package
- on-premises CI/CD pipelines and Maven repositories
- manual process to deploy updates to the server

was becoming a bottleneck for growth and innovation.

While this setup was functional, it was becoming increasingly difficult to manage and scale. With the rise of cloud-native technologies, I saw an opportunity to not only modernise our setup but also to leverage the benefits of scalability, resilience, and ease of management that Kubernetes offers.

## The dependencies

Before diving into the rebuild, I took stock of the existing dependencies and tools that would be part of the new architecture:
- **Kubernetes**: The backbone of the new architecture, providing orchestration for containerised applications.
- **Helm**: For managing Kubernetes applications and simplifying deployments.
- **Docker**: To containerise the various services and applications.
- **GitHub Actions**: For CI/CD pipelines to automate testing and deployment.
- **GitHub Container Registry**: To store and manage Docker images.
- **GitHub Projects**: For project management and tracking progress.
- [**Agones**](https://agones.dev/site/): A high-performance game server hosting solution that integrates well with Kubernetes.
- [**Shulker**](https://shulker.jeremylvln.fr/): A Minecraft Kubernetes operator to manage Minecraft server instances.
- [**Minestom**](https://minestom.net/): A lightweight Minecraft server implementation that allows for custom game development.

With these tools in mind, I set out to rebuild Miners Online from the ground up.

## Step 1: Establishing the Monorepo

Starting on October 7th, the first step was to scrap all existing repositories and start from scratch with a monorepo approach. Whilst a nuclear option, this resulted in an empty canvas the [**Miners Online monorepo**](https://github.com/miners-online/monorepo) which can be carefully built upon with planning *(which planning was certainly lacking before)*.

I started by documenting the philosophy and structure of the monorepo, ensuring that it would be easy to navigate and maintain. This included setting up directories for each game, different services, and shared packages.

## Step 2: Building the first games and packages

On the evening of October 7th, I began the process of creating the first games with Minestom and packages within the monorepo. I started with designing the lobby as it is quite minimal and can revel what shared packages are needed for other games. By October 8th, I had the lobby and a few essential packages set up including basic world management and schematic loading.

## Step 3: Containerising with Docker with GitHub Actions

With the lobby and packages in place, I spent the next day (October 9th), containerising the application using Docker. I created a Dockerfile for the lobby and set up a GitHub Actions workflow to automate the build and push process to the GitHub Container Registry. This allowed for easy testing and deployment of the application.

## Step 4: Further game development

Between October 10th and 12th, I made multiple improvements including:
- Block entity support in schematics
- Sign based game object creation
- Basic NPC implementation
- Environment variable support for configuration
- Simplification of the Docker build pipeline
- Demo Django project for future API services

These enhancements were crucial for creating better game experiences and ensuring that the server could be easily configured.

## Step 5: Kubernetes and Agones integration

On October 22nd, I began the process of integrating Kubernetes and Agones into the architecture. I used GitHub Copilot to generate the initial Helm charts and deployment configurations. However Copilot made many mistakes and ignored me many times, so I guided it through the correct configurations and best practices.

Currently the Kubernetes deployment is in a prototype state, with game servers using Paper MC instead of Minestom for testing purposes. These will be updated to use Minestom once the game development is more mature.

## Step 6: Managing Minecraft servers with Shulker

To manage the Minecraft server instances, I decided to use Shulker, a Kubernetes operator specifically designed for Minecraft.

However, there is a version incompatibly between Shulker and the latest Minestom release which I resolved by submitting a [pull request (PR) to Shulker](https://github.com/jeremylvln/Shulker/pull/1119) - *I have already [contributed to Shulker in the past](https://github.com/jeremylvln/Shulker/issues?q=author%3Aajh123)*.

Shulker was stuck with an old Minestom version (the `1_21-9219e96f76` snapshot) for a while, that did not support the latest `Auth` API changes in Minestom. I redesigned Shulker's Minestom SDK and choose the last Minestom version (`2025.10.05-1.21.8`) to support Java 21 - as Shulker builds with Java 21 I could not use the actual latest Minestom version (`2025.10.18-1.21.10`) which supports Java 25+ only. **As of writing this post, the PR is still unmerged, which means I am unable to use the Shulker SDK in my games and as a result unable to deploy any games to the cluster.**

## Step 7: Project management and tracking progress

On October 23rd, I set up [a public roadmap on GitHub Projects](https://github.com/orgs/miners-online/projects/2) to manage and track the progress of the rebuild.

Introducing project management practices after most of the work was done, will help to keep future development organised and ensure that tasks are prioritised effectively.

Furthermore, a public roadmap allows the community to see what is planned and contribute ideas or feedback.

## Conclusion: Reflecting on the Journey

Rebuilding Miners Online from scratch into a cloud-native architecture using Kubernetes in just one month has been an intense but rewarding experience. While there is still much work to be done, the foundation has been laid for a more scalable, resilient, and manageable infrastructure.

What's next? The immediate next steps involve:
- Waiting for the Shulker PR to enable Minestom support
- Integrating the Shulker SDK into the games
- Testing and deploying the games to the Kubernetes cluster

This journey has not only modernised Miners Online but also provided valuable insights into cloud-native technologies and best practices. I look forward to continuing this journey and sharing more updates in the future.