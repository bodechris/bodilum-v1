import PageV0 from '@/components/ui/page-v0/PageV0'
import React from 'react';

function ServicesPage() {
  return (
    <PageV0>
      <h1 className="!text-9xl">Services</h1>
      <h2 className="!text-4xl">Our services and offerings</h2>
      <div className="mt-8 space-y-4">
        <div className="p-4 border rounded">
          <h3 className="text-2xl font-bold">48-hour Small Business Brand Kit</h3>  
          <p className="mt-2 text-gray-600">Description of Service 1.</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="text-2xl font-bold">Landing Page + WhatsApp Lead Funnel</h3>
          <p className="mt-2 text-gray-600">Description of Service 2.</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="text-2xl font-bold">WhatsApp Business Sales Setup</h3>
          <p className="mt-2 text-gray-600">Description of Service 3.</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="text-2xl font-bold">Company Profile Design</h3>
          <p className="mt-2 text-gray-600">Description of Service 4.</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="text-2xl font-bold">Pricelist/Menu Design Pack</h3>
          <p className="mt-2 text-gray-600">Description of Service 5.</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="text-2xl font-bold">Google Business Profile Makeover</h3>
          <p className="mt-2 text-gray-600">Description of Service 6.</p>
        </div>
      </div>
    </PageV0>
  )
}

export default ServicesPage;