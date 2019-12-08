import { format } from 'date-fns';

/**
 *
 * @param date {Date} The date to be formatted.
 *
 * @returns String with the date formatted
 */
export const formatDate = (date): string => date ? format(date, 'yyyy-MM-d') : format(new Date(), 'yyyy-MM-d');

/**
 *
 * @param data {Object}
 * @param data.tracks {Object}
 * @param data.tracks.items {[]Object}
 *
 * @returns Array with the extracted URI from the playlist songs
 */
export const extractSongURI = (data): Array<string> => data.tracks.items.map(item => item.track.uri);
