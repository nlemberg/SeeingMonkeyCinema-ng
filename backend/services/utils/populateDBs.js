const axios = require("axios");

const serverURL =
  process.env.NODE_ENV === "production"
    ? "https://smc-services-dev.herokuapp.com"
    : "http://localhost:8000";

// const membersURL = "https://jsonplaceholder.typicode.com/users";
const moviesURL = "https://api.tvmaze.com/shows";

// const populateMembersDB = async () => {
//   let { data: members } = await axios.get(`${serverURL}/members`);
//   if (members.length === 0) {
//     const { data: response } = await axios.get(membersURL);
//     members = response.map(async (member) => {
//       try {
//         await axios.post(`${serverURL}/members`, member);
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   }
// };

const populateMoviesDB = async () => {
  let { data: movies } = await axios.get(`${serverURL}/movies`);
  if (movies.length === 0) {
    const { data: response } = await axios.get(moviesURL);
    movies = response.map(async (movie) => {
      try {
        await axios.post(`${serverURL}/movies`, movie);
      } catch (error) {
        console.log(error);
      }
    });
  }
};

// module.exports = { populateMembersDB, populateMoviesDB };
module.exports = { populateMoviesDB };
