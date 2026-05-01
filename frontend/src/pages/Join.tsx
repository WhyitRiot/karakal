import React, {useContext} from 'react';
import * as yup from 'yup';
import {type FieldValues, useForm} from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup";
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";
import {useNavigate} from "react-router";

const Join = () => {
    const context = useContext(GameStateContext);
    if (!context) throw Error("outside of context!");
    const navigate = useNavigate();
    const {joinGame, setGameId, playerName} = context;
    const joinSchema = yup.object({
        gameId: yup.string().matches(
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            "Must be a UUID").required()
    })

    const {register, reset, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(joinSchema)
    })

    type parsedSchema = yup.InferType<typeof joinSchema>;

    const onSubmit = async (e: FieldValues) =>{
        const parsedSchema : parsedSchema = await joinSchema.validate(e);
        console.log(parsedSchema);
        reset()
        if (!playerName) return;
        setGameId(parsedSchema.gameId);
        joinGame(parsedSchema.gameId, playerName);
        navigate("/game")
    }

    return (
        <div className={"flex flex-col h-screen w-screen items-center justify-center gap-2 text-5xl"}>
            <form className={"flex flex-col h-1/3 w-1/3 justify-center items-center gap-3"} onSubmit={handleSubmit(e => onSubmit(e))}>
                <label className={"h-1/4"} htmlFor={"gameIdInput"}>Enter the Game ID</label>
                <p className={"text-2xl text-red-500 h-1/4"}>{errors.gameId && errors.gameId.message}</p>
                <input className={"border rounded text-center h-1/4 w-full text-2xl"} {...register("gameId")} type="text" id={"gameIdInput"}/>
                <button className={"h-1/4 w-2/3 border rounded hover:cursor-pointer hover:bg-blue-400/50"} type={"submit"}>Join</button>
            </form>
        </div>
    );
};

export default Join;