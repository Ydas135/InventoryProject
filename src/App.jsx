import { router } from './router/router'
import { RouterProvider } from 'react-router'

export function App() {
  return (
    <RouterProvider router={router}/>
  )
}


