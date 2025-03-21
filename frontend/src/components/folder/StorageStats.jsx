import React from 'react';
import { useStorageStatsQuery } from '../../store/folder';


const StorageStats = () => {
  const { data, error, isLoading } = useStorageStatsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Storage Statistics</h2>
      <p>Total Files: {data.totalFiles}</p>
      <p>Total Size: {data.totalSize} bytes</p>
      <p>Total Images: {data.totalImages}</p>
      <p>Total Image Size: {data.totalImageSize} bytes</p>
      <p>Total PDFs: {data.totalPdfs}</p>
      <p>Total PDF Size: {data.totalPdfSize} bytes</p>
      <p>Total Text Files: {data.totalTextFiles}</p>
      <p>Total Text Size: {data.totalTextSize} bytes</p>
      <p>Total Folders: {data.totalFolders}</p>
      <p>Remaining Size: {data.remainingSize} bytes</p>
    </div>
  );
};

export default StorageStats;