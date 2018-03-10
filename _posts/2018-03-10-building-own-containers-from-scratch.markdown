---
layout: "post"
title: "Building own Containers from scratch"
date: "2018-03-10 11:40"
---
# Why would someone do that??
I currently work on my Bachelor thesis about Containers.  
One of the many things i wanted to understand is the way, containers achive sucha lightweight footprint while still have all the features the do.

## Research
To better understand the main concepts used i googled and found two awesome talks about things
1. The awesome Talk about Containers from scratch.
Huge thanks to Eric Chiang for this blog post and the corresponding talk at CoreOS Fest.
2. The other thing i found was from a colleague of Eric Chiang, Redbeard. This guy made a nice github repos about building minimal containers explaining how one can create own tarballs as a file system for containers and how one can reduce sizes of images by a whole lot.  
**It is definitly worth the read.**

## Step by Step
As I definitly wanted to apply the concepts learned by my research, this is a step by step explanation on how I build a full container, containing an instance of python to check, if the isolation and configuration really worked.

### Step 1: Installing Ubuntu
Yes, that was the first step for me, as I'm more of a Windows guy (shame on me) and all the tools and concepts do not work on Windows as they where shown.

### Step 2: Building a tarball
As Redbeard writes in his work, containers are just tarballs with nearly no fancyness. They basically just host a filesystem, change the root of a process to this system and use Linux kernel features to isolate the process.

Building an own tarball is extremly helpfull to reduce the size of a container image by quite a lot, as shown in the Talk from Redbeard with the example of the shout image. I was quite supprised after seeing that he reduced the sice to about 1/20 of what it was. Thats when i decided to use buildroot and the presented Tools to build my own tarball

# TODO: INFO ABOUT ALL OF THIS

# Sources
- [Redbeard: Minimal Containers](https://github.com/brianredbeard/minimal_containers)
  - [Talk for this](https://www.youtube.com/watch?v=gMpldbcMHuI) (The first ~30 Minutes)
- [Eric Chiang: Containers from Scratch](https://ericchiang.github.io/post/containers-from-scratch/)
  - [Talk to this](https://www.youtube.com/watch?v=wyqoi52k5jM) (36 Minutes long)

**Thanks a lot for the Work done**
