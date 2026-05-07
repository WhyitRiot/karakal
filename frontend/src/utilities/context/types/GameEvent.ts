import type {Action} from "./Action.ts";

export type GameEvent = {
    sequence_number: number,
    player_id: number,
    username: string,
    action_type: string,
    action: Action

}