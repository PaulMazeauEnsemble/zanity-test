import { getClient, isPreview } from '@/app/sanity/client';

export function createPreviewHandler() {
  return {
    getPreviewStatus: (searchParams?: { preview?: string }) => {
      return isPreview(searchParams);
    },
    
    getPreviewQuery: (query: string, searchParams?: { preview?: string }) => {
      const preview = isPreview(searchParams);
      return getClient(preview).fetch(query);
    }
  };
} 