# Matchmaking Service

## Purpose

This project attempts to simulate a competitive online team-based game's matchmaking service and records and shows the average waiting time and rating tightness of each rating bin.

The codebase allows:
1. Creating new matchmaking algorithms through inherting base `Matchmaker` Class
2. Customizing bin ratings and number of bins for matchmaking
3. Customizing `config.js` to experiment with wait times

## Pre-Requisite

**Please use the following guide to install your tools for the OS of your choice**
### Linux
Using CLI:
```
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
nvm install node
```

### Mac
using CLI:
```
curl -L https://bit.ly/n-install | bash
sudo n latest
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

## Running App
To run app with default values:
```
<!-- for linux -->
./dist/matchmake-linux

<!-- for mac -->
./dist/matchmake-macos

<!-- for windows -->
dist\matchmake.exe
```

To run app with supplied values on linux (use the appropriate calling style for other OS):
```
<!-- user guide -->
./dist/matchmake-linux -h

<!-- using another sample data file -->
./dist/matchmake-linux -f /your/file.json

<!-- selecting 5v5 -->
./dist/matchmake-linux -t 5

<!-- using custom number of servers -->
./dist/matchmake-linux -s 100

<!-- finding clients to queue every 1 second -->
./dist/matchmake-linux -q 1

<!-- find a match every 1 second -->
./dist/matchmake-linux -m 1

<!-- update client status every 0.1 -->
./dist/matchmake-linux -u 0.1

<!-- end a match every 1 second -->
./dist/matchmake-linux -e 1

```