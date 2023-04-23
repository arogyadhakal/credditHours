import { Card, Stack, Typography, Divider } from "@mui/material";
import { Bar } from "../components/bar";
import { SliderReddit } from "../components/slider";
import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { db } from '../firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export function Post() {
  const { postId } = useParams()

  const [postTitle, setPostTitle] = useState(null)
  const [postAuthor, setPostAuthor] = useState(null)
  const [postSentiment, setPostSentiment] = useState(null)
  const [postContent, setPostContent] = useState(null)
  const [displayPostSentiment, setDisplayPostSentiment] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      const postCollectionsRef = collection(db, 'posts')
      const query1 = query(postCollectionsRef, where('id', '==', postId))
      const querySnapshot = await getDocs(query1)
      
      if (querySnapshot.size === 0) {
        console.log('There is no post with that specific ID')
      }
      else {
        querySnapshot.forEach((doc) => {
          const temp = doc.data()
          const tempTitle = temp['title']
          const tempAuthor = temp['author']
          const tempSentiment = temp['sentiment_scores']
          const tempContent = temp['selftext']
          const tempDisplayPostSentiment = Math.round(tempSentiment * 100) / 100
          setPostTitle(tempTitle)
          setPostAuthor(tempAuthor)
          setPostSentiment(tempSentiment)
          setPostContent(tempContent)
          setDisplayPostSentiment(tempDisplayPostSentiment)
        })
      }
      
    }
    fetchPost();
  }, [postId]) 

  return (
    <>
        <Bar />
        <Card sx={{ margin: "5%" }}>
          <Stack sx={{ display: "flex", padding: "2%", margin: "2%" }}>
            <Typography id="header" variant="h5" fontWeight="bold">
              {postTitle}
            </Typography>
            <Typography padding="2%" id="author">Posted by {postAuthor}</Typography>
            <Divider />
            <Typography padding="2%" id="content">
              {postContent}
            </Typography>
            <Divider />
            <Typography variant="h6" padding="2%" id="pulse">
            {displayPostSentiment}
            </Typography>
            <SliderReddit value={postSentiment}></SliderReddit>
          </Stack>
        </Card>
    </>
  )
}