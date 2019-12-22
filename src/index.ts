import { formatDate } from './utils/helpers';
import {
  getCurrentUserId,
  findFirstPlaylist,
  getPlaylistSongs,
  createPlaylist,
  addTracksToPlaylist,
} from './utils/spotify';

// TODO: Implement logs service, a.K.a Sentry

(async (): Promise<void> => {
  try {
    const loggedUserId = await getCurrentUserId();
    const playlistName = `Discovery Weekend, ${formatDate(new Date())}`;
    const playlistOptions = { public: false };
    const weeklyPlaylist = await findFirstPlaylist('Discover Weekly');

    const [songsURI, playlistId] = await Promise.all([
      getPlaylistSongs(weeklyPlaylist.id),
      createPlaylist(loggedUserId, playlistName, playlistOptions),
    ]);

    await addTracksToPlaylist(songsURI, playlistId);
  } catch (error) {
    throw new Error(error);
  }
})();
