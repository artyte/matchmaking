# Riot Games HKG Studio

## Context

Riot Games HKG Studio coding challenge.

## Problem Statement

Let's pretend that we’ve created a new competitive online team-based game ;)

Players of different skills levels will play the game, so we’ll need to match them in a way that keeps the game fun and fair. We want to match players based on their individual skill level and ensure teams are balanced. We're not expecting each matchup to be perfect (especially not at first), but we want the matchmaking system to eventually get smarter and accurately match players on teams.

Your challenge is to code a comprehensive matchmaking system in any technology you feel comfortable with. Your solution will repeatedly draw a set number of players from a larger pool and match them into teams. Players will enter the matchmaking process as solo participants, so your system should create balanced 3v3, 5v5, etc. teams.

We’ve provided you with sample data in JSON for a pool of 200 players that includes their names, total wins and total losses. We’re happy to toss additional info into the matchmaking mix, so go ahead and invent a new data field and use that in your code if you’re feeling extra ambitious.

## Criteria

An engineer will take whatever you submit and test it, so make sure your solution:

- is documented
- contains the source code
- will compile as submitted
- runs on any machine/OS
- is easy to test ;)

Ideally, we want a flexible system that’ll allow us to edit the matchmaking rules and test out different strategies without extensive engineering efforts.

Last but not least, your solution should be "production-ready", so consider:

- best practices and principles
- build scripts
- tests (unit / integration / coverage)

We've also provided you a Maven/Java project template as a starting point to create your matchmaking system but **feel free to disregard it and propose your own flavor. Use the tech stack of your choice that will allow you to better demonstrate your craft/mastery**.


## Pre-Requisite

**Please use the following guide to install your tools for the OS of choice**
### Linux
Using CLI:
```
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
nvm install node
```

### Windows
Using GUI:
Download and install from [this link](https://nodejs.org/dist/v20.2.0/node-v20.2.0-x64.msi)


## Building App
To build the app, simply run these commands in your terminal of choice:
```
<!-- for linux/mac -->
npm run build

<!-- for windows -->
npm run build-windows
```

This will produce the binary/executable in `./dist/`. The binary/executable will be used for running the app in the CLI.