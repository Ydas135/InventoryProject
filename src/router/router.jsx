import { createBrowserRouter, Navigate } from "react-router";
import { Login } from "../app/auth/Login";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";
import { DashboardLayout } from "../common/layouts/DashboardLayout";
import { Inventory } from "../app/inventory/Inventory"
import { PublicRoute } from "../features/auth/components/PublicRoute";
import { Home } from "../app/home/Home";
import { Product } from "../app/product/Product"
import { Sale } from "../app/sale/Sale"


export const router = createBrowserRouter([
    {
        element:<PublicRoute/>,
        children:[
            {
                path:"/login",
                Component:Login,
            }
        ]
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
                        Component: Home,
                    },
                    {
                        path: "inventory",
                        Component: Inventory,
                    },
                    {
                        path: "products",
                        Component: Product,
                    },
                    {
                        path: "sales",
                        Component: Sale,
                    }
                ]
            }
        ]
    }
])