import spotify from 'spotify-web-api-node';
import {} from 'dotenv/config'

const Spotify = new spotify({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.REDIRECTURI,
});

export default Spotify;