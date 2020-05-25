import React from "react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import styled from "styled-components";

const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

// metadata
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

// spasi antara avatar dan metainfo
const MetaInfo = styled.div`
  padding-right: 1em;
`;

// rata kanan dilayar besar
const UserActions = styled.div`
  margin-left: auto;
`;

const Note = ({ note }) => {
  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
            src={note.author.avatar}
            alt="{note.author.username} avatar"
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <em>By</em> {note.author.username} <br />
          {format(note.createdAt, "D MMM YYYY")}
        </MetaInfo>
        <UserActions>
          <em>Favorite:</em>
        </UserActions>
      </MetaData>
      <ReactMarkdown source={note.content} />
    </StyledNote>
  );
};

export default Note;
