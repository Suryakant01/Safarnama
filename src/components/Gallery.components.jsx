import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import Skeleton from '@mui/material/Skeleton';
import { useFirebase } from "../context/firebase.context.jsx"; // Import the context

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  overflow: 'hidden', // Ensure overflow is hidden to prevent text from spilling out
}));

// Utility function to shuffle an array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Utility function to generate a random height
const getRandomHeight = () => Math.floor(Math.random() * (300 - 150 + 1)) + 150;

export default function BasicMasonry() {
  const { getArticles, getImageURL } = useFirebase(); // Get functions from context
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchArticles = async () => {
      const articlesSnapshot = await getArticles();
      const articlesData = [];

      for (const doc of articlesSnapshot.docs) {
        const data = doc.data();
        const imageURL = await getImageURL(data.imageURL); // Get the image URL from Firebase Storage
        articlesData.push({ ...data, imageURL });
      }

      // Shuffle the articles array to randomize the order of images
      setArticles(shuffleArray(articlesData));
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchArticles();
  }, [getArticles, getImageURL]);

  return (
    <Box sx={{ width: '100%', minHeight: 600, padding: 2 }}>
      <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
        {loading
          ? [...Array(8)].map((_, index) => (
              <Item key={index} sx={{ height: getRandomHeight() }}>
                <Skeleton variant="rectangular" width="100%" height="100%" />
              </Item>
            ))
          : articles.map((article, index) => (
              <Item key={index} sx={{ height: getRandomHeight() }}>
                <img
                  src={article.imageURL}
                  alt={article.place}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </Item>
            ))}
      </Masonry>
    </Box>
  );
}
