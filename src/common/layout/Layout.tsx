import {Navbar} from '@components/Navbar'
import clsx from 'clsx'
import Head from 'next/head'
import React from 'react'
import {Component} from 'types/component'

export const Layout: React.FC<Component & { title?: string }> = (props) => {
    const {title, className, children} = props
    return (
        <>
            <Head>
                <title>{title || 'Multiplayer Games'}</title>
            </Head>
            <main className="flex flex-col items-center h-screen overflow-auto">
                <Navbar/>

                <section
                    className={clsx(
                        'w-full max-w-[1440px] mt-5 p-2 flex flex-col text-[#6f6f6f]',
                        className
                    )}>
                    {children}
                </section>
            </main>
        </>
    )
}
