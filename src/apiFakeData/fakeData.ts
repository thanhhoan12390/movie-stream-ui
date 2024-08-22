import { MovieInformation } from '~/models';
import images from '~/assets/images';

export const bannerMovieInfo: MovieInformation = {
    id: 1,
    name: 'Sailor Moon',
    bgImage: images.bannerImg,
    description: `One by one, Sailor Moon's friends and loved ones are targeted by a formidable new enemy who threatens to destroy everything and rule over the cosmos`,
    cast: 'Kotono Mitsuishi, Kenji Nojima, Misato Fukuen',
    genres: ['Action Anime', 'Anime Series', 'Japanese'],
    release: '2024',
    episodes: 2,
    maturity: ['nudity', 'suggestive content', 'violence'],
};
