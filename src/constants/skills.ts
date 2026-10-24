export interface SkillGroup {
  label: string
  items: string[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  { label: 'Languages', items: ['JavaScript', 'TypeScript', 'PHP', 'Java'] },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Vue/Nuxt.js', 'Tailwind CSS', 'Zustand', 'Styled Components', 'Turborepo', 'webpack'],
  },
  {
    label: 'AI & 3D',
    items: ['tldraw', 'Reaflow', 'React Three Fiber', 'Three.js', 'WebGPU', 'Streaming AI chat', 'Multi-provider AI (RunPod, OpenRouter)'],
  },
  { label: 'Backend', items: ['Node.js', 'Express.js', 'NestJS', 'Laravel', 'Spring', 'Firebase', 'Supabase'] },
  { label: 'Cloud & DevOps', items: ['AWS (Lambda, SNS, SQS, S3, EC2)', 'Google Cloud', 'Serverless'] },
  { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { label: 'Tools', items: ['Git', 'Docker'] },
]

export const FEATURED_SKILLS = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'NestJS',
  'Laravel',
  'Supabase',
  'PostgreSQL',
  'MongoDB',
  'AWS',
  'Three.js',
  'Docker',
  'AI Prompting',
]
