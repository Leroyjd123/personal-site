import { Button } from './button'

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
}

export const Default = {
  args: { children: 'See my work', variant: 'default', size: 'default' },
}

export const Outline = {
  args: { children: 'Read my writing', variant: 'outline' },
}

export const Ghost = {
  args: { children: 'Contact', variant: 'ghost' },
}
