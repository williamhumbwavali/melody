import { song } from "../data"
import TrackList from "./tracklist"

interface Props {
    playing: song,
    setPlaying: (playing: song) => void
    setIsPlaying: (isPlaying: boolean) => void
}

function Home({ playing, setPlaying, setIsPlaying }: Props) {
    return (
        <div id="home">
            <TrackList playing={playing} setIsPlaying={setIsPlaying} setPlaying={setPlaying} />
        </div>
    )
}
export default Home;