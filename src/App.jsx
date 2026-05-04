import { UserProvider } from './context/UserContext'
import { router } from './router/router'
import { RouterProvider } from 'react-router'

export function App() {
  return (
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  )
}


