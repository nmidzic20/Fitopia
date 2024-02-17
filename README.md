A web application created within 24 hours for RiHack 2023 hackathon, aimed at promoting health using gamification. The idea is for users to be able to unlock new chapters of a visual novel via walking a certain amount of km each day, which would be tracked via Google Fit app with smartwatches or smartphones. (Genuine Google Fit API calls are used here and they fetch the number of steps displayed in the demo below, but won't work in the current development version since the token is expired, as it was used for demo and not for production version). 

The offered features would include daily quests for promoting physical and mental health, like drinking X glasses of water or reading a chapter of a book, and completing each chapter unlocks new worlds set in a new location (e.g. grassland, desert, ocean, lava world).

The map of the game world and logo are original - credit: [@kjand296] (https://www.github.com/kjand296).
The chapter artwork and story are created using AI assets.

![til](./demo.gif)

# Installation

From `backend` directory, run `node index.js`

From `frontend` directory, run `ng serve` and go to `http://localhost:4200`
