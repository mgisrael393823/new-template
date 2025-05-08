import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import buildingConfig from "../../config/building-config";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - {buildingConfig.name}</title>
        <meta name="description" content="Page not found" />
      </Head>
      
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-[#777777] mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="px-6 py-3 bg-[#E57161] text-white rounded-md hover:bg-opacity-90 transition-colors">
          Return to Home
        </Link>
      </div>
    </>
  );
}