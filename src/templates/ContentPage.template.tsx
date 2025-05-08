import React from "react";
import Head from "next/head";
import buildingConfig from "../../config/building-config";

interface ContentPageProps {
  title: string;
  description: string; 
  introduction: string;
  content: React.ReactNode;
}

export default function ContentPageTemplate({ 
  title, 
  description, 
  introduction,
  content 
}: ContentPageProps) {
  return (
    <>
      <Head>
        <title>{title} - {buildingConfig.name}</title>
        <meta name="description" content={description} />
      </Head>
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        
        <div className="bg-[#FCFAF5] border border-[#E8E3D9] p-6 rounded-md mb-10">
          <p className="text-lg">
            {introduction}
          </p>
        </div>
        
        <div className="space-y-10">
          {content}
        </div>
      </main>
    </>
  );
}

// Helper function to create a content page
export function createContentPage(
  title: string, 
  description: string, 
  introduction: string,
  contentComponent: React.ReactNode
) {
  return function ContentPage() {
    return (
      <ContentPageTemplate
        title={title}
        description={description}
        introduction={introduction}
        content={contentComponent}
      />
    );
  };
}