import spotifyApi from '../services/spotify';
import { extractSongsURI, formatDate } from './helpers';

spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);
spotifyApi.setRefreshToken(process.env.SPOTIFY_REFRESH_TOKEN);

const refreshAccessToken = async (): Promise<void> => {
  try {
    await spotifyApi.refreshAccessToken().then(({ body }) => {
      const accessToken = body.access_token;
      spotifyApi.setAccessToken(accessToken);
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUserId = async (): Promise<string> => {
  let userId: string;

  try {
    userId = await spotifyApi.getMe().then(({ body }) => body.id);
  } catch {
    return refreshAccessToken()
      .then(() => getCurrentUserId())
      .catch(error => {
        throw new Error(error);
      });
  }

  return userId;
};

export const findFirstPlaylist = (playlistName: string): Record<string, any> => {
  return spotifyApi.searchPlaylists(playlistName).then(({ body }) => body.playlists.items[0]);
};

export const getPlaylistSongs = async (playlistId: string): Promise<string[]> => {
  return spotifyApi.getPlaylist(playlistId).then(({ body }) => extractSongsURI(body));
};

export const createPlaylist = async (
  loggedUserId: string,
  playlistName: string,
  playlistOptions: object,
): Promise<string> => {
  return spotifyApi
    .createPlaylist(loggedUserId, playlistName, playlistOptions)
    .then(({ body }) => body.id);
};

export const addTracksToPlaylist = async (songs: string[], playlistId): Promise<void> => {
  return spotifyApi
    .addTracksToPlaylist(playlistId, songs)
    .then(() => console.log(`Playlist created on ${formatDate(new Date(), true)}!`));
};
