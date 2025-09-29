
import { useState, useEffect } from 'react';
import { staticCV, staticArticles } from '../data/staticData';

const isGitHubPages = window.location.hostname.includes('github.io') || window.location.hostname === 'mohamed-abdellatif-ayadi.github.io';

export function useCV() {
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isGitHubPages) {
      // Use static data for GitHub Pages
      setCv(staticCV);
      setLoading(false);
    } else {
      // Use API for Replit
      fetch('/api/cv')
        .then(res => res.json())
        .then(data => {
          setCv(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
  }, []);

  return { data: cv, isLoading: loading, error };
}

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isGitHubPages) {
      // Use static data for GitHub Pages
      setArticles(staticArticles);
      setLoading(false);
    } else {
      // Use API for Replit
      fetch('/api/articles')
        .then(res => res.json())
        .then(data => {
          setArticles(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
  }, []);

  return { data: articles, isLoading: loading, error };
}
