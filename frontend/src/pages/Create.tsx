import React from 'react';

const Create = () => {
    return (
        <div className={"flex h-screen w-screen justify-center items-center"}>
            <div className={"flex flex-col h-1/3 w-1/3 justify-center items-center gap-3"}>
                <p className={"text-5xl"}>Game ID</p>
                <p className={"text-2xl text-amber-500"}>1b191d1f-1601-404d-8d53-e2b437ce9483
                </p>
                <p className={"text-2xl"}>Share with your friends!</p>
                <button className={"text-5xl w-2/3 border rounded hover:bg-blue-400/50 hover:cursor-pointer"}>Join</button>
            </div>
        </div>
    );
};

export default Create;