/*             Feel free to use this skeleton I have provided or delete everything and do your own thing!             */

// TODO: LIST WORKFLOW
//    1. State
//    ↓
//    2. Render
//    ↓
//    3. Fetch data
//    ↓
//    4. User events
//    ↓
//    5. Update state
//    ↓
//    6. Render again





//If you would like to, you can create a variable to store the API_URL here.
//This is optional. if you do not want to, skip this and move on.

const API_URL = 
  "https://fsa-puppy-bowl.herokuapp.com/api/2605-SARAP/players"

/////////////////////////////
/*This looks like a good place to declare any state or global variables you might need*/

////////////////////////////

let puppies = [];
let selectedPuppy = null;

const app = document.querySelector("#app");

/**
 * Fetches all players from the API.
 * This function should not be doing any rendering
 * Instead, this function should be keeping our state up to date
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch (API_URL);
    const { data } = await response.json();
    puppies = data.players;
    render();
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fetches a single player from the API.
 * This function should not be doing any rendering
 * Instead, this function should be keeping our state up to date
 * @param {number} playerId
 */
/**
 * Note: In order to call fetchSinglePlayer() a player's id is required.
 * Unless we know the id of the player we are trying to fetch, we cannot call fetchSinglePlayer()
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch (`${API_URL}/${playerId}`);
    const { data } = await.response.json
    selectedPuppy = data.player;
    render();
  } catch (error) {
    console.log(error);
  }
};

/**
 * Adds a new player to the roster via the API.
 * Once a player is added to the database, the new player
 * should appear in the all players page without having to refresh
 * @param {Object} newPlayer the player to add
 */
/* Note: we need data from our user to be able to add a new player
 * What does that sound like we need? An OBJECT
 */
/**
 * Note#2: addNewPlayer() expects you to pass in a
 * new player object when you call it. How can we
 * create a new player object and then pass it to addNewPlayer()?
 */

const addNewPlayer = async (newPlayer) => {
  try {
    await fetch (API_URL,
      {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });
    await fetchAllPlayers();
  } catch (error) {
    console.log(error);
  }
};

/**
 * Removes a player from the roster via the API.
 * Once the player is removed from the database,
 * the player should also be removed from our view without refreshing
 * @param {number} playerId the ID of the player to remove
 */
/**
 * Note: In order to call removePlayer() a player's id is required.
 * Unless we know the id of the player we are trying to remove, we cannot call removePlayer()
 */

const removePlayer = async (playerId) => {
  try {
    await fetch (
      `${API_URL}/${playerId}`, 
      {
        method: "DELETE",
    }
  );
  selectedPuppy = null;
  await fetchAllPlayers();
} catch (error) {
  console.log(error);
}
};

/**
 * Updates html to display a list of all players or a single player page.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player in the all player list is displayed with the following information:
 * - name
 * - image (with alt text of the player's name)
 *
 * Additionally, for each player we should be able to:
 * - See details of a single player. The page should show
 *    specific details about the player clicked such as: name, id, breed, status, image, and team or unassigned if no team
 * - Remove from roster. When a button is clicked, should remove the player
 *    from the database and our current view without having to refresh
 *
 */
const render = () => {
  app.innerHTML = `
    <h1>Puppy Bowl</h1>
    
    <main>
      <section>
        <h2>Add a Puppy</h2>

        <form id="puppyForm">
          <input name="name" placeholder="Name" required/>
          <input name="breed" placeholder="Breed" required/>
          <button>Add Puppy</button>
        </form>
      </section>

      <section>
        <h2>Puppy List</h2>

        <div id="puppyList">
          ${puppies
            .map((puppy) => {
              return `
                <div class="puppy" data-playerid="${puppy.id}">
                <h3>${puppy.name}</h3>
                <img src=${puppy.imageUrl}" alt="${puppy.name}"/>
                </div>
            `;
            })
              .join("")}
        </div>
      </section>

      <section>
            <h2>Puppy Details</h2>
            <div id="puppyDetails">
              ${
                !selectedPuppy
                  ? `<p>Please select a puppy to see more details</p>`
                  : `
                    <h3>${selectedPuppy.name}</h3>
                    <p>${selectedPuppy.id}</p>
                    <p>${selectedPuppy.breed}</p>
                    <p>${selectedPuppy.status}</p>
                    <p>${selectedPuppy.id}</p>
                  `
              }
            </div>
      </section>
    </main>
  `
};

/**
 * Initializes the app by calling render
 * HOWEVER....
 */
const init = async () => {
  //Before we render, what do we always need?

  render();
};

init();
