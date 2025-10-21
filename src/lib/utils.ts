export function clamp(number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max)
}

export function formatViewCount(count: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: count > 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(count)
}

export function sanitizeSlug(slug: string): string {
  return slug.toLowerCase().replace(/[^a-z0-9-]/g, '-')
}

export function getMetadata(title: string, description: string) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
