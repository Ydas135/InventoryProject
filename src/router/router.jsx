import { createBrowserRouter } from "react-router";
import { Login } from "../app/auth/Login";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";
import { DashboardLayout } from "../common/layouts/DashboardLayout";
import { Inventory } from "../app/inventory/Inventory"

export const router = createBrowserRouter([
    {
        path:"/login",
        Component:Login,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                Component: DashboardLayout,
                children: [
                    {
                        index: true,
                        Component: Inventory,
                    }
                ]
            }
        ]
    }
])