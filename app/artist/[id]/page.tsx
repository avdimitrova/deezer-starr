import Head from "next/head";
import { fetchDeezerOneArtist } from "@/lib/deezerServices";
import { Album, Artist, Track, Playlist } from "@/lib/types";
import ArtistTabs from "./ArtistTab";
import ArtistHeader from "./ArtistHeader";

interface DeezerOneArtistResponse {
  artist: Artist;
  albums: Album[];
  playlists: Playlist[];
  tracks: Track[];
  relArtist: Artist[];
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const {
    artist,
    albums,
    playlists,
    tracks,
    relArtist,
  }: DeezerOneArtistResponse = await fetchDeezerOneArtist(id);

  return (
    <>
      <Head>
        <title>{artist.name} - Deezer Starr</title>
        <meta name="description" content={`Explore ${artist.name}'s music, albums, and playlists. ${artist.nb_fan} fans love this artist!`} />
        <meta name="keywords" content={`Deezer, artist, ${artist.name}, music`} />
      </Head>
      <main className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 pt-8 pb-25 h-full text-gray-800 dark:text-gray-200">
        <ArtistHeader artist={artist} tracklist={tracks} />

        <ArtistTabs
          tracks={tracks}
          playlists={playlists}
          albums={albums}
          relArtist={relArtist}
        />
      </main>
    </>
  );
}
