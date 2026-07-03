import { siteConfig } from './config'

export const creativeHome = {
  kicker: 'words · music · wonder',
  headline: 'Some people keep diaries.',
  headlineSub: 'I keep worlds.',
  subtext: 'A product manager who moonlights as a poet, a piano player, a ponderer of things that don\'t have answers yet.',
  availability: 'somewhere between the coast and a cup of chai ☕',
  floatingWords: ['wonder', 'craft', 'stillness', 'language', 'music', 'coast', 'memory', 'light'],
  stats: [
    { value: '100+', label: 'blog posts since 2016' },
    { value: '6', label: 'Trinity piano grades' },
    { value: '4', label: 'languages I dream in' },
    { value: '∞', label: 'unfinished poems' },
  ],
  recentWriting: [
    { title: 'Stillness', tag: 'poem', date: 'Mar 2026', color: '#c4b5fd' },
    { title: 'Between two languages', tag: 'essay', date: 'Dec 2025', color: '#86efac' },
    { title: 'The coast at 5am', tag: 'vignette', date: 'Oct 2025', color: '#fda4af' },
  ],
  cta: [
    { label: 'Read my writing →', href: '/writing', primary: true },
    { label: 'Who even am I?', href: '/about', primary: false },
  ],
}

export const creativeAbout = {
  kicker: 'the human behind the cursor',
  headline: 'Leroy Dsouza.',
  subheadline: 'Thinker. Tinkerer. Coastal creature.',
  intro: 'I grew up on the Karnataka coast — the kind of place where the sea talks back if you listen long enough. That probably explains the writing.',
  sections: [
    {
      icon: '🎹',
      label: 'The musician',
      body: 'Six Trinity Guildhall grades on keyboard. I play because some feelings are too round for words — they need to be curved into sound instead. Mostly Einaudi. Sometimes jazz. Occasionally something entirely unnameable.',
    },
    {
      icon: '✍️',
      label: 'The writer',
      body: 'I\'ve been keeping a blog since 2016 — long before it was a "content strategy." I write about language, silence, what cities feel like at 5am, and why mangoes taste different when you\'re homesick.',
    },
    {
      icon: '📚',
      label: 'The reader',
      body: 'I read slowly and dog-ear pages. Favourites: Calvino, Murakami, Mary Oliver, Richard Feynman. I believe every good book rewires something gently.',
    },
    {
      icon: '🌊',
      label: 'The coastal creature',
      body: 'I\'m from Udupi — and the Arabian Sea is in every piece of writing I\'ve ever done, whether I meant it or not. I think geography is destiny.',
    },
  ],
  funFacts: [
    'Fluent in 4 languages. Dreaming in a 5th.',
    'Can explain NAV calculation and Murakami in the same breath.',
    'Believes chai is a creative tool.',
    'Once stayed up till 3am finishing a product spec and a poem. In that order.',
    'Thinks the most underrated skill is listening.',
  ],
}

export const creativeWriting = {
  kicker: 'words from the coast',
  headline: 'Things I\'ve written into existence.',
  intro: 'Essays, poems, teardowns, vignettes. I\'ve been sending words out into the world since 2016 and I\'m not stopping now.',
  filters: ['all', 'essay', 'poem', 'teardown', 'creative'],
  emptyMsg: 'Nothing here yet — come back when the tide brings something in.',
}

export const creativeContact = {
  kicker: 'say something',
  headline: 'Pull up a chair.',
  subheadline: 'I like long conversations about short things.',
  intro: 'Whether it\'s a collaboration, a recommendation, or just a really good song you think I should hear — I\'m genuinely all ears.',
  idealConnect: [
    { icon: '🌙', text: 'Writers who build things (or builders who write)' },
    { icon: '🎨', text: 'Creatives with a system fetish' },
    { icon: '📖', text: 'Readers with book recommendations' },
    { icon: '🎵', text: 'Musicians who overthink' },
  ],
  links: [
    { label: 'Email me', value: 'leroy.social@gmail.com', href: 'mailto:leroy.social@gmail.com', external: false },
    { label: 'My blog', value: 'ljdblog.wordpress.com', href: 'https://ljdblog.wordpress.com', external: true },
    { label: 'LinkedIn', value: '/in/leroyjd', href: 'https://linkedin.com/in/leroyjd', external: true },
    { label: 'Resume', value: 'view ✨', href: siteConfig.resumeUrl, external: true },
  ],
}
