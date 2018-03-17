---
layout: "post"
title: "Building own Containers from scratch"
date: "2018-03-10 11:40"
modified: "2018-03-17 11:00"
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

1. Installing Linux Distro (I used Vagrant, but thats another topic)
2. Build a tarball as a filesystem
3. Implement a process you want to isolate
4. Isolate the process

This sound easy, lets get started!

### Step 1: Installing Ubuntu
Yes, that was the first step for me, as I'm more of a Windows guy (shame on me) and all the tools and concepts do not work on Windows as they where shown.

### Step 2: Building a tarball
As Redbeard writes in his work, containers are just tarballs with nearly no fancyness. They basically just host a filesystem, change the root of a process to this system and use Linux kernel features to isolate the process.

Building an own tarball is extremly helpfull to reduce the size of a container image by quite a lot, as shown in the talk from Redbeard with the example of the shout image. I was quite supprised after seeing that he reduced the sice to about 1/20 of what it was. Thats when I decided to use buildroot and the presented Tools to build my own tarball.

#### Step 2.1: buildroot
I used buildroot to build my own tarball only containing Python3. To do this I used Vagrant (great piece of Software) with a Vagrant file released buildroot. I would highly recommend turning up the core count, as this will make the build process by far faster.  
And when i say only, i mean it. No init System, since only one Process will be running. No Kernel, as i already have one. No manual pages, as i will have to look those up on my Ubuntu machine. Basically, everything I can disable, I will disable it.

This will give me an file system tarball with ~20Mb size. Sounds good to me.

### Step 3: Implement a process you want to isolate
i do not want to go to deep into this, as you can implement everything you want (based on Python in my case). I basically did nothing and started a python Webserver, just to check if everything worked.

```
python3 -m http.server
```

### Step 4: Isolate the process
Now we get to the interesting and hardest part of this project, isolating the python webserver from the host (which in my case is the vagrant VM on my Windows Machine, this is getting complicated with all the port forwardings).

# TODO: Isolate python to check what has to be done

# Sources
- [Redbeard: Minimal Containers](https://github.com/brianredbeard/minimal_containers)
  - [Talk for this](https://www.youtube.com/watch?v=gMpldbcMHuI) (The first ~30 Minutes)
- [Eric Chiang: Containers from Scratch](https://ericchiang.github.io/post/containers-from-scratch/)
  - [Talk to this](https://www.youtube.com/watch?v=wyqoi52k5jM) (36 Minutes long)
- [Buildroot Vagrant File](https://raw.githubusercontent.com/paralin/buildroot/master/support/misc/Vagrantfile)

**Thanks a lot for the Work done**
