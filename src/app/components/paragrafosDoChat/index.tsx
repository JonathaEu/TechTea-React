import React from 'react'

export default function ParagrafosDoChat({ resposta }: any) {
    return (
        <>
            <div>
                <button className='bg-red-700 justify-center flex'
                    onClick={() => console.log(resposta)}>PARATESTAR</button>
                {/* <p>{response}</p> */}
            </div>
        </>
    )
}
