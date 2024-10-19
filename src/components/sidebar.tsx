import { Active } from "../utils/types"
import Github from './../../src/assets/github.svg';

interface Navigation {
    id: number
    icon: string
    active: Active
}
interface Links {
    id: number
    icon: string
    link: string
}

const navigation: Array<Navigation> = [
    {
        id: 0,
        icon: 'fi fi-rr-home',
        active: 'home'
    },
    {
        id: 1,
        icon: 'fi fi-rr-music-note',
        active: 'lyrics'
    },
];

const links: Array<Links> = [
    {
        id: 0,
        icon: Github,
        link: 'https://github.com/williamhumbwavali/melody'
    },
];

interface Props {
    active: Active,
    setActive: (active: Active) => void;
}

function Sidebar({ active, setActive }: Props) {
    return (
        <div id="sidebar">
            <nav className="navigation">
                <ul>
                    {navigation.map(link =>
                        <li key={link.id}>
                            <button onClick={() => setActive(link.active)} className={active === link.active ? 'link active' : 'link'}>
                                <i className={link.icon}></i>
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
            <nav className="system">
                <ul>
                    {links.map(link =>
                        <li key={link.id}>
                            <a href={link.link} target="_blank" rel="noreferrer" className='link'>
                                <img src={link.icon} height='20' width='20' />
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar;