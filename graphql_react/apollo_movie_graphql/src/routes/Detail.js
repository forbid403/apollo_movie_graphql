import React from 'react'
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;
const Title = styled.div`
  font-size : 65px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;


const Description = styled.div`
`;


const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      description_intro
    }
  }
`;

export default () => {
  let {id} = useParams()
  id = parseInt(id)
  const {loading, data} = useQuery(GET_MOVIE, {
    variables:{id}
  })
  return (
    <Container>
      <Column>
        <Title>{loading ? "loading..." : data.movie.title}</Title>
        <Description>{data?.movie?.description_intro}</Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}/>
    </Container>
  )
};