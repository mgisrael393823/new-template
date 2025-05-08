import React from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import Layout from "@/components/Layout/Layout";
import { Heading } from "@/components/ui/Heading";
import { HighlightBox } from "@/components/ui/HighlightBox";
import buildingConfig from "../../config/building-config";
import { loadMarkdownContent } from "@/lib/markdown";

// Get static props to load markdown content at build time
export async function getStaticProps() {
  const markdownContent = loadMarkdownContent('market-intelligence');
  
  return {
    props: {
      markdownContent,
    },
  };
}

export default function MarketIntelligence({ markdownContent }: { markdownContent: string }) {
  return (
    <>
      <Head>
        <title>Market Intelligence - {buildingConfig.name}</title>
        <meta name="description" content={`Market intelligence analysis for ${buildingConfig.name}`} />
      </Head>
      
      <Layout>
        <div className="max-w-4xl mx-auto px-4">
          <Heading level={1}>Market Intelligence</Heading>
          
          <HighlightBox>
            <p className="text-lg">
              This section provides a comprehensive analysis of the {buildingConfig.location.neighborhood} 
              market, demographic trends, and demand drivers affecting {buildingConfig.name}.
            </p>
          </HighlightBox>
          
          <div className="mt-8 prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                // Customize markdown rendering
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-800" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-medium mt-4 mb-2 text-gray-800" {...props} />,
                p: ({ node, ...props }) => <p className="my-4 text-gray-700" {...props} />,
                ul: ({ node, ...props }) => <ul className="my-4 list-disc list-outside pl-5" {...props} />,
                ol: ({ node, ...props }) => <ol className="my-4 list-decimal list-outside pl-5" {...props} />,
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                a: ({ node, ...props }) => <a className="text-[#3B7A57] hover:underline" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-[#3B7A57] pl-4 my-4 italic text-gray-700" {...props} />
                ),
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>
      </Layout>
    </>
  );
}