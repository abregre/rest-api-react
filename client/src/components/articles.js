import './articles.css';
import React, { useState, useEffect } from 'react';
import axios from '../axios';

function Articles() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/api/articles');
      setArticles(req.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Articles</h2>
    </div>
  );
}

export default Articles;
