export interface song {
    readonly id: number,
    readonly title: string,
    readonly artist: string,
    readonly ft?: string,
    readonly cover?: string,
    readonly path: string
}

export const music: Array<song> = [
    {
        id: 1,
        title: 'Chamber of reflection',
        artist: 'Mac deMarco',
        cover: 'assets/img/ab67616d0000b273ec6e9c13eeed14eedbd5f7c9.jpeg',
        path: 'assets/audio/chamber_of_reflection_mp3_75466.mp3'
    },
    {
        id: 2,
        title: 'Sacrifice',
        artist: 'Elton John',
        cover: 'assets/img/EltonJohnSacrifice7InchSingleCover.jpg',
        path: 'assets/audio/Sacrifice_Elton_John.mp3'
    },
    {
        id: 3,
        title: 'I will always love you',
        artist: 'Whitney Houston',
        path: 'assets/audio/I_will_always_love_you.mp3'
    },
    {
        id: 4,
        title: 'Smile',
        artist: 'Juice WRLD',
        ft: 'The Weeknd',
        cover: 'assets/img/lengedsneverdie.PNG',
        path: 'assets/audio/smile.mp3'
    },
    {
        id: 5,
        title: 'Life Goes On',
        artist: '2pac',
        path: 'assets/audio/2pac_life_goes_on_mp3_72793.mp3',
        cover: 'assets/img/alleyesonme.jpg'
    },
    {
        id: 7,
        title: 'Fuck love',
        artist: 'Xxxtentacion',
        ft: 'Trippie Redd',
        cover: 'assets/img/tentacion.JPG',
        path: 'assets/audio/fucklove.mp3'
    },
    {
        id: 8,
        title: 'Changes',
        artist: '2pac',
        path: 'assets/audio/2pac_changes_ft._talent_mp3_46218.mp3'
    },
    {
        id: 9,
        title: 'Carles Whisper',
        artist: 'Jorge Michael',
        path: 'assets/audio/Carles_Whisper_Jorge_Michael.mp3'
    },
    {
        id: 10,
        title: 'His Hers',
        artist: 'Internet Money',
        ft: 'Don Toliver, Gunna, Lil uzi vert',
        cover: 'assets/img/hishers.JPG',
        path: 'assets/audio/hishers.mp3'
    },
].sort((a, b) => a.title.localeCompare(b.title));
