"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${promptId}/posts`);
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Profile name="User" desc="Welcome to User profile page" data={posts} />
  );
};

export default UserProfile;
