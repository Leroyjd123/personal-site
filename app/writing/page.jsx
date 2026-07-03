import { getPosts } from '../../lib/wordpress'
import WritingOrTech from '../../components/WritingOrTech'

export const metadata = {
  title: 'Writing',
  description: 'Essays on product and technology, business teardowns, and creative writing by Leroy Dsouza. Published since 2016.',
  openGraph: {
    title: 'Writing · Leroy Dsouza',
    description: 'Essays, teardowns, and creative work. Professional writing synced from WordPress.',
    url: 'https://leroydsa.com/writing',
  },
  alternates: { canonical: 'https://leroydsa.com/writing' },
}

const FALLBACK_POSTS = [
  { title: "A PM's honest take on building with AI in 2026", date: 'May 2026', type: 'essay', slug: 'ai-2026' },
  { title: 'What a hyperlocal eCommerce teardown taught me', date: 'Apr 2026', type: 'teardown', slug: 'ecommerce-teardown' },
  { title: 'Stillness', date: 'Mar 2026', type: 'creative', slug: 'stillness' },
  { title: 'PriceLabs — dynamic pricing for short-term rentals', date: 'Feb 2026', type: 'teardown', slug: 'pricelabs' },
  { title: 'Why eCommerce in India is still misunderstood', date: 'Jan 2026', type: 'essay', slug: 'ecommerce-india' },
  { title: 'Between two languages', date: 'Dec 2025', type: 'creative', slug: 'two-languages' },
  { title: 'The coast at 5am', date: 'Oct 2025', type: 'creative', slug: 'coast-5am' },
]

export default async function Writing() {
  let posts = []
  try {
    posts = await getPosts()
  } catch {
    // fall through to fallback
  }

  if (!posts || posts.length === 0) posts = FALLBACK_POSTS

  return <WritingOrTech posts={posts} />
}
