import { useState } from 'react';
import toast from 'react-hot-toast';
import { templateApi } from '@/services/api';

export const useTemplateDownload = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const download = async (id: string, slug: string) => {
    try {
      setDownloadingId(id);
      const { downloadUrl } = await templateApi.download(id);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${slug}.zip`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Download started');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setDownloadingId(null);
    }
  };

  return { download, downloadingId, isDownloading: (id: string) => downloadingId === id };
};
