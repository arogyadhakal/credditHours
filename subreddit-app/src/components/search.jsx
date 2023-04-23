import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, IconButton, SearchIcon, TextField } from '@mui/material';

export function Search({ posts }) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchPosts = () => {
    console.log('Posts:', posts)
    const filteredPosts = posts.filter((post) =>
      post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredPosts.slice(0,5);
  };

  console.log('Render SearchComponent')

  return (
    <div style={{ position: 'absolute', top: '25%', right: '1%' }}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
      />
      <Link to={`/posts/?q=${searchQuery}`}></Link>
        <List>
        {searchQuery && (
          <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', maxWidth: '500px', padding: '10px', backgroundColor: '#f1f1f1', border: '1px solid #ccc', borderRadius: '5px', zIndex: 9999 }}>
            {searchPosts().map((post) => (
              <ListItem>
                <div key={post.id}>
                <h3>
                  <ListItemText
                    primary={
                      <Link 
                        to={`/post/?q=${post.title}`}
                        style={{ textDecoration: "none", color: "black" }}>
                        {post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title}
                      </Link>
                    }
                  ></ListItemText>
                </h3>
                </div>
              </ListItem>
            ))}
          </div>
        )}
        </List>
    </div>
  );
};