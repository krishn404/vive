import axios from 'axios';

export interface Track {
  id: string;
  name: string;
  artists: {
    primary: Array<{ name: string }>;
  };
  downloadUrl: Array<{ quality: string; url: string }>;
  image: Array<{ quality: string; url: string }>;
  duration?: string;
}

interface ApiArtist {
  name: string;
}

interface ApiResponse {
  data: {
    results: ApiTrack[];
    total?: number;
    page?: number;
  };
}

interface ApiTrack {
  id: string;
  name: string;
  artists: {
    primary: ApiArtist[];
  };
  downloadUrl: Array<{ quality: string; url: string }>;
  image: Array<{ quality: string; url: string }>;
  duration: string;
}

// Shuffle array function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const fetchMusicData = async (searchQuery: string = 'lofi-study'): Promise<Track[]> => {
  try {
    let allTracks: Track[] = [];
    let page = 1;
    let hasMoreTracks = true;

    while (hasMoreTracks && page <= 5) { // Increased to 5 pages for more variety
      const response = await axios.get<ApiResponse>(
        `/api/vibe-proxy?name=${encodeURIComponent(searchQuery)}&page=${page}`
      );

      if (!response.data?.data?.results) {
        throw new Error('Invalid API response structure');
      }

      const tracks = response.data.data.results;
      
      if (tracks.length === 0) {
        hasMoreTracks = false;
      } else {
        const formattedTracks = tracks
          .filter(track => 
            // Ensure track has all required properties
            track.id &&
            track.name &&
            track.artists?.primary?.length > 0 &&
            track.downloadUrl?.length > 0 &&
            track.image?.length > 0
          )
          .map((track: ApiTrack) => ({
            id: track.id,
            name: track.name,
            artists: {
              primary: track.artists.primary.map((artist: ApiArtist) => ({
                name: artist.name
              }))
            },
            downloadUrl: track.downloadUrl
              .filter(url => url.quality === '320kbps' || url.quality === '160kbps')
              .sort((a, b) => {
                // Prefer 320kbps over 160kbps
                if (a.quality === '320kbps') return -1;
                if (b.quality === '320kbps') return 1;
                return 0;
              }),
            image: track.image
              .filter(img => img.quality === '500x500' || img.quality === '150x150')
              .sort((a, b) => {
                // Prefer 500x500 over 150x150
                if (a.quality === '500x500') return -1;
                if (b.quality === '500x500') return 1;
                return 0;
              }),
            duration: track.duration
          }));

        allTracks = [...allTracks, ...formattedTracks];
        page++;
      }
    }

    // Filter and shuffle tracks
    allTracks = allTracks
      .filter(track => 
        track.downloadUrl?.length > 0 && 
        track.image?.length > 0
      );

    // Shuffle the tracks
    const shuffledTracks = shuffleArray(allTracks);

    console.log(`Total tracks fetched and shuffled: ${shuffledTracks.length}`);
    return shuffledTracks;

  } catch (error) {
    console.error('Error fetching music data:', error);
    throw error;
  }
};