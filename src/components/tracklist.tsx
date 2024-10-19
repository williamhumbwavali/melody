import { music, song } from "../data";
import Song from "./ui/song";

function TrackList({ setPlaying, setIsPlaying, playing }:
    {
        setPlaying: (playing: song) => void
        setIsPlaying: (isPlaying: boolean) => void
        playing: song
    }) {
    return (
        <div id="tracklist">
            {music.map((song: song) =>
                <Song
                    key={song.id}
                    song={song}
                    setPlaying={setPlaying}
                    setIsPlaying={setIsPlaying}
                    playing={playing}
                />)
            }
        </div>
    )
}

export default TrackList;