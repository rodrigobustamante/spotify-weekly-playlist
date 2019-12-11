/**
 *
 * @param date {Date} The date to be formatted.
 * @param addTime {boolean} If this value is true, append the time to the return value.
 *
 * @returns String with the date formatted
 */
export const formatDate = (date: Date, addTime = false): string => {
  const dateToFormat = date || new Date();
  const dateFormatted = `${dateToFormat.getFullYear()}-${date.getMonth() +
    1}-${dateToFormat.getDate()}`;

  if (addTime) {
    return `${dateFormatted} ${dateToFormat.getHours()}:${dateToFormat.getMinutes()}:${dateToFormat.getSeconds()}`;
  }

  return dateFormatted;
};

/**
 *
 * @param data {Object}
 * @param data.tracks {Object}
 * @param data.tracks.items {[]Object}
 *
 * @returns Array with the extracted URI from the playlist songs
 */
export const extractSongsURI = (data: SpotifyApi.PlaylistObjectFull): Array<string> => {
  return data.tracks.items.map((item: SpotifyApi.PlaylistTrackObject) => item.track.uri);
};
