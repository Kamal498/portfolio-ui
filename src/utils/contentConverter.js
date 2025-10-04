import TurndownService from 'turndown';
import { marked } from 'marked';

// Initialize Turndown service for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  strongDelimiter: '**',
});

// Custom rules for better conversion
turndownService.addRule('underline', {
  filter: ['u'],
  replacement: (content) => `<u>${content}</u>`,
});

turndownService.addRule('strikethrough', {
  filter: ['s', 'strike', 'del'],
  replacement: (content) => `~~${content}~~`,
});

/**
 * Convert HTML to Markdown
 * @param {string} html - HTML content
 * @returns {string} Markdown content
 */
export const htmlToMarkdown = (html) => {
  if (!html) return '';
  try {
    return turndownService.turndown(html);
  } catch (error) {
    console.error('Error converting HTML to Markdown:', error);
    return html;
  }
};

// Configure marked options
marked.setOptions({
  breaks: true, // Support line breaks
  gfm: true, // GitHub Flavored Markdown
});

/**
 * Convert Markdown to HTML using marked parser
 * This ensures the HTML matches what's rendered by ReactMarkdown
 * @param {string} markdown - Markdown content
 * @returns {string} HTML content
 */
export const markdownToHtml = (markdown) => {
  if (!markdown) return '';
  
  try {
    // Use marked to parse markdown properly
    let html = marked.parse(markdown);
    
    // Clean up any double paragraph wrapping
    html = html.replace(/<p><p>/g, '<p>');
    html = html.replace(/<\/p><\/p>/g, '</p>');
    
    return html;
  } catch (error) {
    console.error('Error converting Markdown to HTML:', error);
    return markdown;
  }
};
