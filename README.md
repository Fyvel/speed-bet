# SpeedBet
Small application (Front-end &amp; Back-end) that will enable user to place bets on a match and to see if he's good at betting.

## Prerequisites
Before you begin, make sure your development environment includes Node.js and an npm package manager.
Your environment must also includes the .NET Core SDK.

## Database
- From `~\speed-bet\SpeedBet\SpeedBet.Dal`, run `dotnet run` to create and populate the database. (This will reinitialize the entire database and restore default entries).

## Builds
### Back-end
- From `~\speed-bet\SpeedBet`, run `dotnet restore` to restore dependencies and packages

### Front-end
- From `~\speed-bet\speed-bet-app`, run `npm install` to install npm packages

## Launch
### Back-end
- From `~\speed-bet\SpeedBet\SpeedBet.Api`, run `dotnet run`
Make sure the address it's listening on is the same as the one used by the angular app
(you can find it hardcoded in `~\speed-bet\speed-bet-app\src\app\services\matches.service.ts`)

### Front-end
- From `~\speed-bet\speed-bet-app`, run `npm start`

## Running unit tests
-  From `~\speed-bet\speed-bet-app`, run `npm test` and open in a browser the `index.html` (in the coverage folder generated)
