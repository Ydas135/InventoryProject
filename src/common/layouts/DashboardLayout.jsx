import React from 'react'
import { Outlet } from 'react-router'
import { Sidebar } from '../components/sidebar/Sidebar'

export function DashboardLayout() {
  return (
    <div className='min-h-screen bg-slate-950'>
      <Sidebar />
      <main>
        <section>
            <Outlet />
        </section>
      </main>
    </div>
  )
}
