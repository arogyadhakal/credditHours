import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import Autocomplete from "@mui/lab/Autocomplete";
import TextField from "@mui/material/TextField";

export function Search({ subreddit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    if (searchTerm === "" || !subreddit) {
      setSearchResults([]);
      return;
    }

    console.log(subreddit);

    const fetchData = async () => {
      const postsCollectionRef = collection(db, "posts");

      // Replace "yourSubredditFilter" with the subreddit filter value you want to use
      const yourSubredditFilter = subreddit;
      console.log(subreddit);

      const q = query(
        postsCollectionRef,
        where("subreddit", "==", yourSubredditFilter),
        orderBy("title"),
        startAt(searchTerm),
        endAt(searchTerm + "\uf8ff"),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, data: doc.data() });
      });

      setSearchResults(results);
    };

    fetchData();
  }, [searchTerm, subreddit]); // Add subreddit to dependency array

  const handleOptionClick = (option) => {
    console.log(option);
    navigate(`/post/${option.data.id}`);
    // Perform any action you want to do when an option is clicked
  };

  return (
    <div>
      {subreddit && (
        <Autocomplete
          freeSolo
          options={searchResults}
          getOptionLabel={(option) =>
            `${option.data.title} by ${option.data.author} on ${option.data.timeAgo}`
          }
          onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
          renderInput={(params) => (
            <TextField {...params} label="Search Posts" />
          )}
          onChange={(event, option) => handleOptionClick(option)}
        />
      )}
    </div>
  );
}
