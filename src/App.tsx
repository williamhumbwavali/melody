import { useState } from 'react';
import './App.css';
import './icons/uicons-regular-rounded/css/uicons-regular-rounded.css';
import './icons/uicons-solid-rounded/css/uicons-solid-rounded.css';
import Sidebar from './components/sidebar';
import Home from './components/home';
import Player from './components/player';
import { music, song } from './data';
import Lyrics from './components/lyrics';
import { Active } from './utils/types';

function App() {
  const [active, setActive] = useState<Active>('home');
  const [playing, setPlaying] = useState<song>(music[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <div className="tab">
        <Sidebar active={active} setActive={setActive} />
        
        {active === 'home' && (
          <Home
            setPlaying={setPlaying}
            playing={playing}
            setIsPlaying={setIsPlaying}
          />
        )}
  
        {active === 'lyrics' && (
          <Lyrics playing={playing} />
        )}
  
        <Player
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          playing={playing}
          setPlaying={setPlaying}
        />
      </div>
    </div>
  );
}

export default App;