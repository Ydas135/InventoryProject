import React from 'react'
import { Outlet } from 'react-router'
import { Sidebar } from '../components/sidebar/Sidebar'

export function DashboardLayout() {
  return (
    <div className='flex min-h-screen bg-slate-950'>
      <Sidebar />
      <main className='flex-1 p-6'>
        <section>
            <Outlet />
        </section>
      </main>
    </div>
  )
}
