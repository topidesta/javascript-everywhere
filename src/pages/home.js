import React from "react";

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

  return (
    <div>
      {data.noteFeed.notes.map((note) => (
        <div key={note.id}>{note.content}</div>
      ))}
    </div>
  );
};

export default Home;
