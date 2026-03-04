import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://drivingfree.online'
  const lastModified = new Date()
  
  return [
    { url: baseUrl, lastModified, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/curriculum`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/library`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/traffic-signs`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/assessment`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/tutor`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'monthly', priority: 0.3 },
  ]
}
