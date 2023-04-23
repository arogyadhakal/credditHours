import { Card, Stack, Typography, Divider } from "@mui/material";
import { Bar } from "../components/bar";
import { SliderReddit } from "../components/slider";
import React from 'react'
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import { db } from '../firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export function Post() {
  const { postId } = useParams()

  const [postTitle, setPostTitle] = useState(null)
  const [postAuthor, setPostAuthor] = useState(null)
  const [postSentimentScore, setPostSentimentScore] = useState(null)
  const [postContent, setPostContent] = useState(null)
  const [displayPostSentiment, setDisplayPostSentiment] = useState(null)
  const [postSentiment, setPostSentiment] = useState(null)
  const [postLink, setPostLink] = useState(null)

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
          const tempSentimentScore = temp['sentiment_scores']
          const tempContent = temp['selftext']
          const tempLink = temp['link']
          const tempDisplayPostSentiment = Math.round(tempSentimentScore * 100) / 100
          let tempSentiment = "Negative"
          if (tempSentimentScore > 0.0) {
            tempSentiment = "Positive"
          }
          else if (tempSentimentScore == 0.0) {
            tempSentiment = "Neutral"
          }
          setPostSentiment(tempSentiment)
          setPostTitle(tempTitle)
          setPostAuthor(tempAuthor)
          setPostSentimentScore(tempSentimentScore)
          setPostContent(tempContent)
          setDisplayPostSentiment(tempDisplayPostSentiment)
          setPostLink(tempLink)
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
              {postSentiment}: {displayPostSentiment}
            </Typography>
            <SliderReddit value={postSentimentScore}></SliderReddit>
            <Divider />
            <Typography padding="2%" id="link">
              <Link
                to={`${postLink}`}
                style={{ color: "inherit" }}
              >
                Link to post on Reddit
              </Link>
            </Typography>
          </Stack>
        </Card>
    </>
  )
}