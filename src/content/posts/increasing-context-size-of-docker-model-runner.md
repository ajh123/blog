---
published: 2025-10-19
title: Increasing Context Size of Docker Model Runner - The Right Way
description: "Upgrading Docker Model Runner to support larger context sizes for improved model performance and capabilities, without cagent or compose files!"
tags: ['docker', 'model-runner', 'context-size', 'ai', 'ml']
---

Docker Model Runner uses a default context size of 4096 tokens, which is insufficient for many modern AI/ML applications that require larger context windows to function effectively.

There are many well-documented solutions, however none are straightforward or reliable, for example there is an [attempt to use `cagent`](https://jgcarmona.com/change-dmr-context-size/) with Docker Model Runner to increase context size, but in my experience the new context size is temporarily applied to the `cagent` process only, and not applied by default to the specific model itself.

However, the official Docker documentation only mentions how you can set the [context size through compose files](https://docs.docker.com/ai/compose/models-and-compose/#model-configuration-options), but again, that only applies to the model instance in the compose project, not the default model context size globally.

Looking at these options, one might assume that no reliable method exists to change the default context size of Docker Model Runner globally. *But let's dig deeper - there is a solution!*

## Introducing the `docker-model` CLI

There is actually a somewhat unknown CLI tool that lives in the Docker Model Runner repo. This tool allows you to manage and configure models directly, including setting the default context size for any model.

Let's install the `docker-model` CLI tool:

1. First, navigate to the [Docker Model Runner repository](https://github.com/docker/model-runner/) with a web browser.
2. Navigate to the Actions tab.
3. Select the `Build model-cli` workflow from the left sidebar.
4. Click on the latest successful workflow run.
5. Scroll down to the "Artifacts" section and download the `dist` artifact.
6. Extract the downloaded ZIP file to a directory of your choice.
7. The archive will contain multiple directories for different operating systems and architectures. Navigate to the directory that matches your system (e.g., `windows-amd64` for Windows on AMD64 architecture).
8. Inside this directory, you will find the `docker-model` executable. You can move this executable to any directory *(and optionally add it to your system's PATH for easier access)*.

## Changing the Default Context Size

If you have already installed models through Docker Desktop, then you can list the installed models using the `docker-model` CLI:

```
docker-model.exe list
```

It will output something like this:

```
MODEL NAME  PARAMETERS  QUANTIZATION    ARCHITECTURE  MODEL ID      CREATED       SIZE
smollm3     3.08 B      IQ2_XXS/Q4_K_M  smollm3       9bff8b097a33  3 months ago  1.78 GiB
gpt-oss                                               e233e4483f51  2 months ago
phi4        14.66 B     IQ2_XXS/Q4_K_M  phi3          03c0bc8e0f5a  6 months ago  8.43 GiB
```

Now to change the default context size of a specific model, use the `configure` command along with the `--context-size` flag. For example, to set the context size of the `smollm3` model to 8192 tokens, run the following command:

```
docker-model.exe configure smollm3 --context-size 8192
```

Don't be fooled by the lack of command output - if it is silent then it has worked! You have successfully changed the default context size of the `smollm3` model to 8192 tokens.

The best part is that, unlike `cagent`, which only initiates temporary sessions, and Compose, which defines per-project settings, `docker-model` talks directly to the Model Runner daemon’s persistent configuration.

## Conclusion

By using the `docker-model` CLI tool, you can easily and reliably change the default context size of Docker Model Runner models without the need for complex workarounds like `cagent` or Compose files. This method ensures that your models can handle larger context sizes globally, improving their performance and capabilities for various AI/ML applications. It's a reminder that even in well-documented systems, there are often hidden gems waiting to be discovered!