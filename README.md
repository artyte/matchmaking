# Matchmaking Service

## Purpose

This project attempts to simulate a competitive online team-based game's matchmaking service and records and shows the average waiting time and rating tightness of each rating bin.

The codebase allows the following customizations:
1. Creating new matchmaking algorithms through inherting base `Matchmaker` Class
2. Customizing bin ratings and number of bins for matchmaking in `config.js`
3. Customizing app values by suppling them as options in the cli
4. Run tests (unit/coverage) on any exportable files using `./tests/files`

## Architecture

This project uses inspirations from [open-match's architecture](https://open-match.dev/site/images/demo-match-sequence.png) as well as [apex's matchmaking](https://www.ea.com/games/apex-legends/news/matchmaking-2023) to create some of the base classes. The following image shows the simulated architecture of this project:

![Architecture](https://github.com/artyte/matchmaking/raw/main/architecture.png)

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
While running the app, please press `ctrl+c` to stop the app and the app will display calculated matchmaking stats.

To run app on linux:
```
<!-- default values -->
./dist/matchmake-linux

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

To run app on macos:
```
<!-- default values -->
./dist/matchmake-macos

<!-- user guide -->
./dist/matchmake-macos -h

<!-- using another sample data file -->
./dist/matchmake-macos -f /your/file.json

<!-- selecting 5v5 -->
./dist/matchmake-macos -t 5

<!-- using custom number of servers -->
./dist/matchmake-macos -s 100

<!-- finding clients to queue every 1 second -->
./dist/matchmake-macos -q 1

<!-- find a match every 1 second -->
./dist/matchmake-macos -m 1

<!-- update client status every 0.1 -->
./dist/matchmake-macos -u 0.1

<!-- end a match every 1 second -->
./dist/matchmake-macos -e 1
```

To run app on windows:
```
<!-- default values -->
dist\matchmake.exe

<!-- user guide -->
dist\matchmake.exe -h

<!-- using another sample data file -->
dist\matchmake.exe -f /your/file.json

<!-- selecting 5v5 -->
dist\matchmake.exe -t 5

<!-- using custom number of servers -->
dist\matchmake.exe -s 100

<!-- finding clients to queue every 1 second -->
dist\matchmake.exe -q 1

<!-- find a match every 1 second -->
dist\matchmake.exe -m 1

<!-- update client status every 0.1 -->
dist\matchmake.exe -u 0.1

<!-- end a match every 1 second -->
dist\matchmake.exe -e 1
```


## Dev Practices
For app logic, this project stores it in the `./src/` folder. The entrypoint is `./src/index.js`.

For testing, this project uses `jest` as the *Test Runner* and the *Assertion Library*. Test files are written as `unit-<class>.js` in the `./tests/` folder.

To test developed code:
```
<!-- for all platforms -->
npm run test
```