export interface Cycle {
    id: number,
    calendar_id: number,
    owner_id: number
    bleed_start: Date,
    bleed_end: Date,
    start_date: Date,
    end_date: Date
}

export interface User {
    id: number,
    email: string,
    cycle: Array<Cycle>
}

export interface UserState {
    token:string,
    user:User,
    isSignedIn:boolean
}

export interface Action {
    payload: any,
    type: string
}