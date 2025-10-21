import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { sanitizeSlug } from '@/lib/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { slug } = req.query
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Invalid slug' })
    }
    const sanitizedSlug = sanitizeSlug(slug)

    if (req.method === 'GET') {
      const views = await prisma.blogView.findUnique({
        where: { slug: sanitizedSlug },
        select: { views: true },
      })
      return res.status(200).json({ views: views?.views ?? 0 })
    }

    if (req.method === 'POST') {
      const updated = await prisma.blogView.upsert({
        where: { slug: sanitizedSlug },
        update: { views: { increment: 1 } },
        create: { slug: sanitizedSlug, views: 1 },
        select: { views: true },
      })
      return res.status(200).json({ views: updated.views })
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
