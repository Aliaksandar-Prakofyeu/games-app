import {Card, CardBody, Heading, Image, Text} from '@chakra-ui/react'
import {Layout} from '../common/layout/Layout'
import {allGames} from '../consts/game'
import Link from 'next/link'
import React from 'react'

export default function Home() {
    return (
        <Layout className="flex-1 justify-center">
            <div className="w-full flex flex-wrap justify-center gap-5">
                {allGames.map(({img, name, href, linkText, description}) => (
                    <Card
                        maxW={{base: 'full', sm: 'xs'}}
                        bg="purple.100"
                        key={name}
                        className="duration-200 hover:shadow-xl !shadow-gray-600"
                    >
                        <CardBody className="flex flex-col">
                            <Image
                                borderRadius="lg"
                                src={img}
                                alt="room img"
                            />

                            <div className="h-full mt-5 flex flex-col justify-between">
                                <div className="grid gap-1">
                                    <Heading size="lg">{name}</Heading>

                                    <Text fontWeight="medium">{description}</Text>
                                </div>

                                <Link
                                    href={href}
                                    className="!mt-5 w-full text-center bg-blue-500 text-white font-semibold px-4 py-2 rounded-md"
                                >
                                    {linkText}
                                </Link>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </Layout>
    )
}
