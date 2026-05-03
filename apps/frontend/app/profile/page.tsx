import PageV0 from '@/components/ui/page-v0/PageV0'
import Link from 'next/link';        
import React from 'react'

function UserProfilePage() {
  return (
    <PageV0>
      <h1 className="!text-9xl">User Profile</h1>
      <h2 className="!text-4xl">Access user dashboard and other user specific pages here...</h2>
      <p>
        <Link href="/profile/brands">brands</Link>
        <Link href="/profile/projects">projects</Link>
        <Link href="/profile/brand-assets">brand assets</Link>
        <Link href="/profile/messages">messages</Link>
        <Link href="/profile/notifications">notifications</Link>
      </p>
    </PageV0>
  )
}

export default UserProfilePage;