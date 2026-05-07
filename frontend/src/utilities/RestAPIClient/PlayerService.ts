import type {User, UserRequest} from "../context/types/User.ts";

const baseURL = "http://localhost:8080/"

export const login = async (username : string) : Promise<Response> => {
    const user : UserRequest = {
        playerId: null,
        username: username,
    }
    return await fetch(`${baseURL}user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });
}

export const create = async (username : string) : Promise<Response> =>{
    const user : UserRequest = {
        playerId: null,
        username: username
    }
    return await fetch(`${baseURL}user/new-player`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
}