import {skribblWords} from './skribbl-words'

export const allGames = [
    {
        img: 'https://cdn.pixabay.com/photo/2013/07/12/15/56/tic-tac-toe-150614_960_720.png',
        name: 'Tic Tac Toe',
        linkText: 'Play Tic-Tac-Toe',
        href: '/tic',
        description:
            'Play Tic-Tac-Toe with your friends.',
    },
    {
        img: 'https://www.onlygfx.com/wp-content/uploads/2017/03/scribble-circle-2.png',
        name: 'Skribbl',
        linkText: 'Play Skribbl',
        href: '/skribbl',
        description:
            'Play Skribbl with your friends.',
    },
]

export const boardTile = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
    (e) => ({
        tile: e,
        username: '',
        playerSymbol: '',
    })
)

export enum gameStatusEnum {
    START = 'START',
    WAIT = 'WAIT',
    LIVE = 'LIVE',
}

export const getRandomWords = () => {
    const randIndex: any = (num?: number) => {
        const randNum = Math.floor(Math.random() * skribblWords.length)
        if (num === randNum) return randIndex(num)
        return randNum
    }

    const randNum1 = randIndex()
    const randNum2 = randIndex(randNum1)
    const randNum3 = randIndex(randNum2)

    const words = [
        skribblWords[randNum1],
        skribblWords[randNum2],
        skribblWords[randNum3],
    ]

    return words
}
