import React from "react"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from '../components/Movies'
const GET_MOVIES = gql`{
    movies{
        id
        medium_cover_image
    }
}`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export default () => {
    const { loading, data } = useQuery(GET_MOVIES);
    return (
        <Container>
            <Header>
                <Title>Apollo Movies With GraphQL</Title>
            </Header>
            <div>
            {loading ? "loading..." :
            data.movies.map(m => <Movie key={m.id} id={m.id}/>)
            }
            </div>
        </Container>
        
    )

};