import {Layout} from '../../common/layout/Layout'
import {TicTacToeBoard} from '@modules/games/TicTacToe'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {Heading} from '@chakra-ui/react'
import {RoomsController} from '@components/RoomsController'
import {uuid} from '@utils/uuid'

const TicTacToe = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const id = router.query.id as string

    useEffect(() => {
        const _username = localStorage.getItem('username')
        setUsername(_username || `Player-${uuid(4)}`)
        setIsLoading(false)
    }, [id])

    if (isLoading) return <></>

    if (!id) return <RoomsController/>

    return (
        <Layout title="Games | Tic Tac Toe" className="items-center">
            <div className="w-full h-full flex flex-col items-center">
                <Heading size="xl">Tic Tac Toe</Heading>
                <TicTacToeBoard roomId={id} username={username || 'Player'}/>
            </div>
        </Layout>
    )
}

export default TicTacToe
