export type CreateMessage = {
    type: "CREATE"
}

export const createCreateMessage = () : CreateMessage => ({
    type: "CREATE"
})