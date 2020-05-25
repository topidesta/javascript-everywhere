import React from "react";
import NoteFeed from "../components/NoteFeed";

// libraries
import { useQuery, gql } from "@apollo/client";

const GET_NOTES = gql`
  query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoritedBy {
          id
        }
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const Home = () => {
  // query hook
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  // jika loading tampilkan pesan loading
  if (loading) return <p>Loading...</p>;

  // jika error fetching data, tampilkan pasan error
  if (error) return <p>Error...</p>;

  return <NoteFeed notes={data.noteFeed.notes} />;
};

export default Home;
