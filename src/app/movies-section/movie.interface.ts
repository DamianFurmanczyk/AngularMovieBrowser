export interface movieGottenFromApi {
    poster_path: string,
    id: number,
    original_title?:string,
    title?: string,
    genre_ids: number[],
    vote_average: number,
    overview: string,
    release_date: string,
    first_air_date: String,
    genres?: {name: string}[],
    listType: string
    }