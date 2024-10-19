import { song } from "../../data"

interface Props {
    song: song
    setPlaying: (playing: song) => void
    setIsPlaying: (isPlaying: boolean) => void
    playing: song
}

function Song({ song, setPlaying, setIsPlaying, playing }: Props) {
    function set () {
        setPlaying(song)
        setIsPlaying(true)
    }
    return (
        <button key={song.id} className="song" onClick={set}>
            <div className="cover">
                <img src={song.cover} alt='' />
            </div>
            <div className="desc">
                <h3 className={playing.id === song.id? 'title active': 'title'}>
                    {song.title}
                </h3>
                <p className='ft'>
                    {song.artist + (song.ft? ', ' + song.ft: '')}
                </p>
            </div>
        </button>
    )
}

export default Song;