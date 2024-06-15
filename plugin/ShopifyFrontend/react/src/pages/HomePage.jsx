import React, { useEffect, useState, useCallback } from 'react';
import { Page, Card, Button } from '@shopify/polaris';
import useFetchData from '../hooks/useFetchData';
import ErrorComponent from '../components/Errors/ErrorComponent';
import { Link } from 'react-router-dom';
import ListComponent from '../components/MainImgs/ListComponent';


const HomePage = () => {
  const { data, error, fetchList } = useFetchData('/api/main_imgs');

  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 15;

  useEffect(() => {
    fetchList({ page: currentPage, perPage: perPage});
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };


  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <Page
      title="メインビジュアル"
      primaryAction={<Link to="/main_imgs/create"><Button variant="primary">+ 新規追加</Button></Link>}
    >
      {data?.data && (
        <div className="mb20">
          <Card title="Fetched Data" sectioned>
            <ListComponent
              items={data.data}
              hasNext={data.meta.hasNextPage}
              hasPrevious={currentPage > 1}
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
            />
          </Card>
        </div>
      )}
    </Page>
  );
};

export default HomePage;
