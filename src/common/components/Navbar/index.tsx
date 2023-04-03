import React from 'react'
import {Button, Image, useToast} from '@chakra-ui/react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import clsx from 'clsx'
import {FaShareAlt} from 'react-icons/fa'


export const Navbar = () => {
    const router = useRouter()
    const currentPath = router.asPath
    const toast = useToast()

    return (
        <header
            className={clsx(
                'z-50 w-full flex items-center justify-center shadow-md sticky top-0'
            )}
        >
            <div className="w-full h-16 p-2 lg:px-4 flex bg-purple-200 items-center justify-between">
                <Link href="/">
                    <Image className="h-12" src="/assets/games/games.png"/>
                </Link>

                {currentPath.includes('?id=') && (
                    <Button
                        borderRadius={'full'}
                        w={10}
                        h={10}
                        p={0}
                        onClick={() => {
                            toast({
                                title: 'Copied successfully.',
                                status: 'success',
                                duration: 2000,
                                isClosable: true,
                            })

                            navigator.clipboard.writeText(window.location.href)
                        }}
                    >
                        <FaShareAlt/>
                    </Button>
                )}

            </div>
        </header>
    )
}
