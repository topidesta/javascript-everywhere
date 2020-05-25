import React from "react";
import ReactMarkdown from "react-markdown";

const Note = ({ note }) => {
  return (
    <article>
      <img src={note.author.avatar} alt="244" />
    </article>
  );
};
