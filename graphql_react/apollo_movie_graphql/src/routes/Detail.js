import React from 'react'
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from 'styled-components'

const Root = styled.div`
  height: 100%;
  width: 100%;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  color: white;
`;
const Container = styled.div`
  height: 85vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.div`
  font-size : 65px;
  margin-bottom: 15px;
`;

const Poster = styled.div`
  width: 25%;
  height: 70%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Description = styled.p`
  font-size:28px;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Suggestions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content : space-evenly;
  justify-items : center;
  width: 100%;
  height: 15vh;
  position: relative;
`;

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
      isLiked @client
    }
    suggestions(id: $id){
      id
      medium_cover_image
    }
  }
`;

export default () => {
  let { id } = useParams()
  id = parseInt(id)
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id }
  })

  return (
    <Root>
      <Container>
        <Column>
          <Title>{loading ? "loading..." : `${data.movie.title} ${data.movie.isLiked ? "💖" : "😢"}`}</Title>
          <Description>{data?.movie?.description_intro}</Description>
        </Column>
        <Poster bg={data?.movie?.medium_cover_image} />
      </Container>
      <Suggestions>
        {data?.suggestions?.map(s =>
          <Poster key={s.id} bg={s.medium_cover_image} />
        )}
      </Suggestions> 
    </Root>

  )
};