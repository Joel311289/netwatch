import React from 'react';
import { useParams } from 'react-router-dom';

const SeriesDetailPage = () => {
  const { id } = useParams();

  return <div>Serie Detail</div>;
};

export default SeriesDetailPage;
