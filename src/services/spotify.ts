import Spotify from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config();

const spotify = new Spotify({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
});

export default spotify;
