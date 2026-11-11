import { MetadataRoute } from 'next';
import { SAMPLE_PROPERTIES, SAMPLE_PROJECTS, SAMPLE_LOCATIONS } from '@/lib/data/sample-data';

const BASE_URL = process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL'
  ? process.env.APP_URL.replace(/\/$/, '')
  : 'https://signatureaura.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/properties`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/locations`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic Property Routes
  const propertyRoutes: MetadataRoute.Sitemap = SAMPLE_PROPERTIES.map(p => ({
    url: `${BASE_URL}/properties/${p.slug}`,
    lastModified: p.createdAt || currentDate,
    changeFrequency: 'weekly',
    priority: p.isFeatured ? 0.9 : 0.8,
  }));

  // Dynamic Project Routes
  const projectRoutes: MetadataRoute.Sitemap = SAMPLE_PROJECTS.map(proj => ({
    url: `${BASE_URL}/projects/${proj.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Location Corridors
  const locationRoutes: MetadataRoute.Sitemap = SAMPLE_LOCATIONS.map(loc => ({
    url: `${BASE_URL}/locations/${loc.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...propertyRoutes, ...projectRoutes, ...locationRoutes];
}
