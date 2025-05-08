import fs from 'fs';
import path from 'path';

/**
 * Loads markdown content from a file
 * @param fileName The markdown file to load (without the .md extension)
 * @returns The markdown content as a string
 */
export function loadMarkdownContent(fileName: string): string {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', `${fileName}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return fileContent;
  } catch (error) {
    console.error(`Error loading markdown content for ${fileName}:`, error);
    return '# Content Not Found\n\nThe requested content could not be loaded.';
  }
}