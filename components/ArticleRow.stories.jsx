import ArticleRow from './ArticleRow'

export default {
  title: 'Site/ArticleRow',
  component: ArticleRow,
}

export const Essay = {
  args: {
    post: {
      title: 'Why eCommerce in India is still misunderstood',
      tag: 'Essay',
      type: 'essay',
      date: 'Jan 2026',
      slug: 'ecommerce-india',
    },
  },
}

export const Teardown = {
  args: {
    post: {
      title: 'PriceLabs — dynamic pricing for short-term rentals',
      tag: 'Teardown',
      type: 'teardown',
      date: 'Feb 2026',
      slug: 'pricelabs',
    },
  },
}

export const LongTitle = {
  args: {
    post: {
      title:
        'A very long article title that should wrap gracefully on narrow viewports without breaking the row layout or pushing the date out of view',
      tag: 'Creative',
      type: 'creative',
      date: 'Mar 2026',
      slug: 'long-title',
    },
  },
}
