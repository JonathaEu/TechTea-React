import React from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    mensagem: string;
}

export default function CampoParaMensagens() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        console.log(data);
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}
                className=""
            >
                <div className="flex flex-col mt-[] h-20  pb-5
            justify-center border-t-4
            ">
                    <input type="text"
                        className="p-4 relative justify-center w-full
              rounded-b-xl z-10 top-32
              "
                        {...register('mensagem')}
                    />

                    <button
                        className=" scale-[2] w-8 h-[19px] mt-[2px]
                flex justify-center
               items-center py-[19px] mr-[10px] z-20 absolute
              right-10
              ">
                        <AiOutlineSend />
                    </button>
                </div>
            </form>
        </div>
    )
}
