import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, Stack } from '@mui/material';
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export function PulseLineGraph({ posts }) {
  const [pulseData, setPulseData] = useState([]);
  const [prevSubreddit, setPrevSubreddit] = useState(null);

  useEffect(() => {
    const fetchData = async (subreddit) => {
      const pulseQuery = query(
        collection(db, "pulse"),
        where("subreddit", "==", subreddit),
        orderBy("timestamp", "asc")
      );

      const querySnapshot = await getDocs(pulseQuery);
      console.log("querySnapshot.docs:", querySnapshot.docs);
      const data = querySnapshot.docs.map((doc) => {
        const { sentiment, timestamp } = doc.data();
        return {
          timestamp: timestamp.toDate(),
          sentiment,
        };
      });
      setPulseData(data);
    };

    if (posts.length !== 0 && posts[0].subreddit !== prevSubreddit) {
      setPrevSubreddit(posts[0].subreddit);
      fetchData(posts[0].subreddit);
    }
  }, [posts, prevSubreddit]);

  console.log(pulseData);

  // ... rest of the code

  return (
    <Card sx={{ margin: "5%" }}>
      <Stack sx={{ p: 2, display: "flex" }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LineChart
            width={600}
            height={300}
            data={pulseData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sentiment"
              stroke="#1676D2"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </Stack>
    </Card>
  );
}

export default PulseLineGraph;
