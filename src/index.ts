import { formatDate, extractSongURI } from './utils/helpers';
import spotifyApi from './services/spotify';

// TODO: Implement logs service, a.K.a Sentry

spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);
spotifyApi.setRefreshToken(process.env.SPOTIFY_REFRESH_TOKEN);

const playlistName = `Discovery Weekend, ${formatDate(new Date)}`;
const playlistOptions = { public: false };

const getCurrentUserId = async (): Promise<string> => {
  let userId = null;
  try {
    const currentUser = await spotifyApi.getMe();

    userId = currentUser.body.id;
  } catch {
    return spotifyApi.refreshAccessToken().then(({ body }) => {
      const accessToken = body.access_token;
      spotifyApi.setAccessToken(accessToken);

      return getCurrentUserId();
    }).catch(err => {
      throw new Error(err);
    });
  }

  return userId;
}

const persistWeeklyPlaylist = async (): Promise<void> => {
  try {
    const loggedUserId = await getCurrentUserId();
    const weeklyPlaylistId = await spotifyApi
      .searchPlaylists('Discover Weekly')
      .then(({ body }) => body.playlists.items[0].id);

    const [songsURI, playlistId] = await Promise.all([
      spotifyApi.getPlaylist(weeklyPlaylistId).then(({ body }) => extractSongURI(body)),
      spotifyApi.createPlaylist(loggedUserId, playlistName, playlistOptions).then(({ body }) => body.id),
    ]);

    await spotifyApi.addTracksToPlaylist(playlistId, songsURI);

    console.log('Playlist Saved!');
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

persistWeeklyPlaylist();
