import { MountProvider } from './MountContext'

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  return <MountProvider>{children}</MountProvider>
}
