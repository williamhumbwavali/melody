import { useEffect, useState } from "react";
import { song } from "../data";

interface Props {
    playing: song
}
function Lyrics({ playing }: Props) {
    const [lyrics, setLyrics] = useState('Loading...');
    const LYRICS_API = "https://api.lyrics.ovh/v1";

    useEffect(() => {
        const { artist, title } = playing;
        async function getLyrics(artist: string, song: string) {
            fetch(`${LYRICS_API}/${artist}/${song}`)
                .then(function (response) {
                    const processingPromise = response.json();
                    return processingPromise;
                })
                .then(function (processedResponse) {
                    setLyrics(processedResponse.lyrics ?? 'Não foi possível carregar a letra dessa música')

                }).catch(function (e) {
                    console.error(e)
                    setLyrics('Não foi possível carregar a letra dessa música')
                });
        }

        getLyrics(artist, title);
    }, [playing])

    const renderTextWithLineBreaks = (text: string) => {
        if (!text) return null; // Verifica se o texto é undefined ou vazio

        return text.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
        ));
    };

    return (
        <div className="lyrics">
            <h2 style={style.title}>Letras</h2>
            <div style={style.content} className={lyrics === 'Loading...' ? 'content loading' : 'content'}>
                {renderTextWithLineBreaks(lyrics)}
            </div>
        </div>
    )
}

const style = {
    title: {
        marginTop: 10
    },
    content: {
        marginTop: 15
    }
}

export default Lyrics;