import React from 'react'
import {useParams} from 'react-router-dom'
import {gql} from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

const GET_MOVIES = gql`
query getMovie{
    movies{
        id
        title
        medium_cover_image
    }
}
`;
export default () => {
    let {id} = useParams();
    id = parseInt(id);
    const {loading, data} = useQuery(GET_MOVIES, {
        variables : {id}
    });
    console.log(loading, data)
    return <div>{id}</div>;
};