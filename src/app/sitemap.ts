import { MetadataRoute } from 'next';
import { TOOLS } from '@/config/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://freefiletools.site';
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms-of-service/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = TOOLS.filter((tool) => tool.slug !== 'image-background-remover').map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}/`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.95,
  }));

  return [...staticPages, ...toolPages];
}
