import { ChangeEvent, TouchEvent, useEffect, useRef, useState } from "react";
import { music, song } from "../data";
import InputRange from "./ui/inputRange";

interface Props {
    playing: song
    setPlaying: (playing: song) => void
    isPlaying: boolean
    setIsPlaying: (isPlaying: boolean) => void
}

interface Coordinate {
    startY: number,
    moveY: number
}

type AudioState = 'none' | 'repeat' | 'random';

function Player({ playing, setPlaying, isPlaying, setIsPlaying }: Props) {
    const audio = useRef<HTMLAudioElement>(null);
    const [songline, setSongLine] = useState<number>(0);
    const [minimized, setMinimized] = useState(true);
    const [volume, setVolume] = useState<number>(100);
    const [audioState, setAudioState] = useState<AudioState>('none'); // none, repeat, random
    const [coordinate, setCoordinate] = useState<Coordinate>({ startY: 0, moveY: 0 });
    const index = music.indexOf(playing);
    const end = useRef<string>('--');
    const start = useRef<string>('00:00');
    const Player = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function getTime(time: number): string {
            const inSecond = second(time);
            const inMinute = minute(time);

            function pattern(time: number): string | number {
                return time < 10 ? '0' + time : time;
            }

            return `${pattern(inMinute)}:${pattern(inSecond)}`;
        }
        const Audio = audio.current;
        if (Audio) {
            if (isPlaying) {
                Audio.play()
            } else {
                Audio.pause()
            }

            const duration = getTime(Audio.duration);

            end.current = duration === 'NaN:NaN' ? 'loading...' : duration;
            start.current = getTime(Audio.currentTime);
        }
    }, [isPlaying, songline])

    function play(e: React.MouseEvent<HTMLButtonElement>): void {
        e.stopPropagation();
        setIsPlaying(!isPlaying);
    }

    function next(): void {
        const length = music.length - 1;
        if (length > index) {
            setIsPlaying(true)
            setPlaying(music[index + 1])
        }
    }

    function prev(): void {
        const prevSong = index - 1;
        if (music.indexOf(music[prevSong]) !== -1) {
            setIsPlaying(true)
            setPlaying(music[prevSong])

        }
    }

    function minute(value: number): number {
        return parseInt(String((value / 60) % 60));
    }

    function second(value: number): number {
        return parseInt(String(value % 60));
    }
    function Volume(value: number): void {
        if (audio.current) {
            audio.current.volume = value / 100;
        }
    }
    function timeUpdate(): void {
        const Audio = audio.current;
        if (Audio) {
            if (Audio.duration === Audio.currentTime) {
                switch (audioState) {
                    case 'none':
                        next();
                        break;
                    case 'random':
                        const random = Math.floor(Math.random() * music.length);
                        setPlaying(music[random]);
                        setIsPlaying(true);
                        break;
                }
            }
            setSongLine(Audio.currentTime)
        }
    }

    function repeat(): void {
        setAudioState(audioState !== 'repeat' ? 'repeat' : 'none');
        const Audio = audio.current;

        if (Audio) {
            Audio.loop = !Audio.loop;
        }
    }

    function minimize(condition: boolean = true): void {
        const player = Player.current;

        if (player) {
            player.style.transform = `translateY(0px)`;

            if (condition) {
                setMinimized(true)
            }
            player.classList.remove('transition-none');

            setCoordinate({ startY: 0, moveY: 0 })
        }
    }

    function onTouchStart(e: TouchEvent<HTMLDivElement>) {
        setCoordinate({ ...coordinate, startY: Number(e.targetTouches[0].clientY) })
    }

    function onTouchMove(e: TouchEvent<HTMLDivElement>) {
        setCoordinate({ ...coordinate, moveY: coordinate.startY - Number(e.changedTouches[0].clientY) })

        const player = Player.current;

        if (player && coordinate.moveY <= 0) {
            player.classList.add('transition-none');
            player.style.transform = `translateY(${-coordinate.moveY}px)`;
        }
    }

    function onTouchEnd() {
        minimize(coordinate.moveY < -200)
    }

    return (
        <div ref={Player} onClick={() => setMinimized(false)} className={minimized ? 'player minimized' : 'player'}>
            <div className="scrollbar" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}></div>
            <h2>Reproduzindo agora</h2>
            <div className="content">
                <div className="cover">
                    <img src={playing.cover} alt="" />
                </div>
                <div className="about">
                    <h3 className="title">
                        {playing.title}
                    </h3>
                    <p className="artist">{playing.artist + (playing.ft ? ', ' + playing.ft : '')}</p>
                </div>
                <div className="time">
                    <div className="data flex-sb-c">
                        <div>{start.current}</div>
                        <div className={end.current === 'loading...' ? 'loading' : ''}>
                            {end.current}
                        </div>
                    </div>
                    <InputRange value={songline} setValue={setSongLine} max={Number(audio.current?.duration ?? 100)} onInput={(e: ChangeEvent<HTMLInputElement>, value: number, setValue: (value: number) => void) => {
                        const Audio = audio.current;
                        if (Audio) {
                            Audio.currentTime = Number(e.target.value);
                        }
                    }} />
                </div>
                <div className="manipulation flex-sb-c">
                    <button onClick={repeat} className={audioState === 'repeat' ? 'repeat action active' : 'repeat action'}>
                        <i className="fi fi-rr-arrows-retweet"></i>
                    </button>
                    <button onClick={prev} className="prev action">
                        <i className="fi fi-sr-rewind"></i>
                    </button>
                    <button onClick={play} className="pp action">
                        <i className={isPlaying ? "fi fi-sr-pause" : "fi fi-sr-play"}></i>
                    </button>
                    <button onClick={next} className="next action">
                        <i className="fi fi-sr-forward"></i>
                    </button>
                    <button onClick={() => { setAudioState(audioState !== 'random' ? 'random' : 'none') }} className={audioState === 'random' ? 'random action active' : 'random action'}>
                        <i className="fi fi-rr-shuffle"></i>
                    </button>
                </div>
                <div className="sound flex-sb-c">
                    <i className="fi fi-rr-volume-off"></i>
                    <InputRange value={volume} setValue={setVolume} className="volume" max={100} onInput={Volume} />
                    <i className="fi fi-rr-volume"></i>
                </div>
            </div>
            <audio onTimeUpdate={timeUpdate} ref={audio} src={playing.path}></audio>
        </div>
    )
}

export default Player;