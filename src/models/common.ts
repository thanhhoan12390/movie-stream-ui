export type Maturity =
    | 'nudity'
    | 'suggestive content'
    | 'violence'
    | 'self-harm'
    | 'suicide'
    | 'substances'
    | 'mature themes'
    | 'language';

export type Genres = 'Action Anime' | 'Japanese' | 'Korean' | 'TV Comedies' | 'Romantic' | 'Anime Series' | 'TV Dramas';

export interface MovieInformation {
    readonly id: number;
    name: string;
    bgImage?: any;
    genres: Array<Genres>;
    cast: string;
    description: string;
    maturity?: Array<Maturity>;
    episodes?: number;
    release: string;
}
