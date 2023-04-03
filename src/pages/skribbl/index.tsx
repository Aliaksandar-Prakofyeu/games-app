import {RoomsController} from '@components/RoomsController'
import {Layout} from '../../common/layout/Layout'
import {SkribblGameBoard} from '@modules/games/Skribbl'

import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'

const SkribblGame = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const id = router.query.id as string

    useEffect(() => {
        const _username = localStorage.getItem('username')
        if (_username) setUsername(_username)
        setIsLoading(false)
    }, [id])

    if (isLoading) return <></>

    if (!id) return <RoomsController setIsAdmin={setIsAdmin}/>

    return (
        <Layout title="Games | Skribbl">
            <SkribblGameBoard roomId={id} username={username} isAdmin={isAdmin}/>
        </Layout>
    )
}

export default SkribblGame
