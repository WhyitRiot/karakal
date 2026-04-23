import React, {type ChangeEvent, useState} from 'react';
import * as yup from 'yup';
import {type FieldValues, useForm} from "react-hook-form";
import type {InferType} from "yup";
import {yupResolver} from '@hookform/resolvers/yup';


const NewPlayerModal = ({setPlayerName, isVisible, setIsVisible} : {setPlayerName : (name: string) => void, isVisible: boolean, setIsVisible : (bool : boolean) => void}) => {
    const [isExiting, setIsExiting] = useState(false);

    const handleClose = () => {
        setIsExiting(true);
    }

    const schema = yup.object({
        name: yup.string().min(3, "Must be at least 3 characters").required("Please enter a name!"),
    })
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm(
        {resolver: yupResolver(schema),
        mode: "onChange"}
    );

    type formData = InferType<typeof schema>;

    const submit = async (e: FieldValues) =>{
        const parsedData : formData = await schema.validate(e);
        setPlayerName(parsedData.name);
        reset();
        handleClose();
    }

    return (
        <div className={`fixed inset-0 ${isVisible ? `z-50` : `-z-1`} flex h-screen justify-center items-center ${isVisible && 'backdrop-blur-md'}`}>
            <div className={"absolute flex flex-col w-1/2 h-2/3"}>
                <form onSubmit={handleSubmit(e => submit(e))}
                      className={`flex flex-col items-center w-full h-full justify-around bg-gray-400 border rounded-4xl ${isVisible ? (isExiting ? 'animate-fade-out' : 'animate-fade-in') : 'translate-y-full opacity-0'}`}
                      onAnimationEnd={() => {
                          if (isExiting) setIsVisible(false);
                      }}
                >
                    <label className={"text-5xl"} htmlFor={"nameInput"}>Enter your name</label>
                    <div className={"flex flex-col items-center h-1/3 w-1/2"}>
                        <p className={"text-red-500 text-2xl h-1/4"}>{errors.name && errors.name.message}</p>
                        <input className={"border rounded text-4xl h-1/4 w-full text-center"}
                               {...register("name")}
                               id={"nameInput"}
                               type={"text"}/>
                    </div>
                    <button className={"text-5xl border rounded-2xl w-1/3 p-4 hover:bg-green-400 hover:cursor-pointer"} type={"submit"}>Go!</button>
                </form>
            </div>
        </div>
    );
};

export default NewPlayerModal;