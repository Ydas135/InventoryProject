import { createBrowserRouter } from "react-router";
import { Home } from '../app/home/Home'

export const router = createBrowserRouter([
    {
        path:"/",
        Component:Home,
    },
])