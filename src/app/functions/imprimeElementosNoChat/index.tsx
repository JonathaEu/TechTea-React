import ParagrafosDoChat from '@/app/components/paragrafosDoChat'
import React from 'react'

export default function ImprimeElementosNoChat({ respostaTeste }: any) {
    console.log(respostaTeste)
    return (
        <ParagrafosDoChat response={respostaTeste} />
    )
}
