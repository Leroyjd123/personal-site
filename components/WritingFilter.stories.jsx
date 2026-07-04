import WritingFilter from './WritingFilter'

const POSTS = [
  { title: "A PM's honest take on building with AI", date: 'May 2026', type: 'essay', tag: 'Essay', slug: 'ai-take' },
  { title: 'What a hyperlocal eCommerce teardown taught me', date: 'Apr 2026', type: 'teardown', tag: 'Teardown', slug: 'teardown' },
  { title: 'Stillness', date: 'Mar 2026', type: 'creative', tag: 'Creative', slug: 'stillness' },
  { title: 'Between two languages', date: 'Dec 2025', type: 'creative', tag: 'Creative', slug: 'two-languages' },
]

export default {
  title: 'Site/WritingFilter',
  component: WritingFilter,
}

export const Default = {
  args: { posts: POSTS },
}

export const Empty = {
  args: { posts: [] },
}
