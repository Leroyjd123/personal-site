import { siteConfig } from './config'

export const contactContent = {
  kicker: 'Contact',
  availability: 'Open to remote roles & select opportunities in Udupi / Mangalore / Bangalore',
  title: ['If it feels', 'like a good ', { em: 'fit' }],
  description: 'I\'m thoughtful about what I take on. I work best where clarity is valued, craft is respected, and the work actually means something. If that sounds like your environment — I\'d love to hear from you.',
  idealFit: [
    { icon: '◎', text: 'Remote-first or async-friendly' },
    { icon: '◎', text: 'Product-led or content-led company' },
    { icon: '◎', text: 'Small to mid-size structured team' },
    { icon: '◎', text: 'Values writing, systems thinking, and craft' },
  ],
  links: [
    {
      label: 'Email',
      sublabel: 'leroy.social@gmail.com',
      href: 'mailto:leroy.social@gmail.com',
      external: false
    },
    {
      label: 'LinkedIn',
      sublabel: 'linkedin.com/in/leroyjd',
      href: 'https://linkedin.com/in/leroyjd',
      external: true
    },
    {
      label: 'Blog',
      sublabel: 'ljdblog.wordpress.com',
      href: 'https://ljdblog.wordpress.com',
      external: true
    },
    {
      label: 'Resume',
      sublabel: 'View on Google Drive',
      href: siteConfig.resumeUrl,
      external: true
    }
  ]
}
