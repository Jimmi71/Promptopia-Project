"use client";

import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

const PromptCardList = ({ data, searchText, setSearchText }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data
        .filter((item) => {
          return searchText === ""
            ? item
            : item.creator.username.toLowerCase().includes(searchText) ||
                item.prompt.toLowerCase().includes(searchText) ||
                item.tag.toLowerCase().includes(searchText);
        })
        .map((post) => (
          <PromptCard
            post={post}
            key={post._id}
            setSearchText={setSearchText}
          />
        ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  console.log(searchText);
  const fetchPosts = async () => {
    const response = await fetch("/app/api/prompt");
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relatvie w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        searchText={searchText}
        data={posts}
        setSearchText={setSearchText}
      />
    </section>
  );
};

export default Feed;
