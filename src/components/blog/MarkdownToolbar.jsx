import { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Code, 
  Heading1, 
  Heading2, 
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  HelpCircle
} from 'lucide-react';
import FormatGuide from './FormatGuide';
import './MarkdownToolbar.css';

const MarkdownToolbar = ({ onInsert }) => {
  const [showGuide, setShowGuide] = useState(false);
  const insertMarkdown = (before, after = '', placeholder = '') => {
    onInsert(before, after, placeholder);
  };

  const insertCodeBlock = (language) => {
    insertMarkdown(`\`\`\`${language}\n`, '\n```', 'Your code here');
  };

  const toolbarButtons = [
    {
      group: 'Headers',
      buttons: [
        { icon: <Heading1 size={18} />, tooltip: 'Heading 1', action: () => insertMarkdown('# ', '', 'Heading 1') },
        { icon: <Heading2 size={18} />, tooltip: 'Heading 2', action: () => insertMarkdown('## ', '', 'Heading 2') },
        { icon: <Heading3 size={18} />, tooltip: 'Heading 3', action: () => insertMarkdown('### ', '', 'Heading 3') },
      ]
    },
    {
      group: 'Text Formatting',
      buttons: [
        { icon: <Bold size={18} />, tooltip: 'Bold', action: () => insertMarkdown('**', '**', 'bold text') },
        { icon: <Italic size={18} />, tooltip: 'Italic', action: () => insertMarkdown('*', '*', 'italic text') },
        { icon: <Underline size={18} />, tooltip: 'Underline', action: () => insertMarkdown('<u>', '</u>', 'underlined text') },
        { icon: <Code size={18} />, tooltip: 'Inline Code', action: () => insertMarkdown('`', '`', 'code') },
      ]
    },
    {
      group: 'Combined',
      buttons: [
        { icon: '***', tooltip: 'Bold + Italic', action: () => insertMarkdown('***', '***', 'bold italic') },
        { icon: '**<u>', tooltip: 'Bold + Underline', action: () => insertMarkdown('**<u>', '</u>**', 'bold underlined') },
        { icon: '*<u>', tooltip: 'Italic + Underline', action: () => insertMarkdown('*<u>', '</u>*', 'italic underlined') },
      ]
    },
    {
      group: 'Styled Headers',
      buttons: [
        { icon: 'H2B', tooltip: 'Bold H2', action: () => insertMarkdown('<h2><strong>', '</strong></h2>', 'Bold Header') },
        { icon: 'H2U', tooltip: 'Underlined H2', action: () => insertMarkdown('<h2><u>', '</u></h2>', 'Underlined Header') },
        { icon: 'H2BU', tooltip: 'Bold + Underline H2', action: () => insertMarkdown('<h2><strong><u>', '</u></strong></h2>', 'Bold Underlined Header') },
      ]
    },
    {
      group: 'Lists',
      buttons: [
        { icon: <List size={18} />, tooltip: 'Bullet List', action: () => insertMarkdown('- ', '', 'List item') },
        { icon: <ListOrdered size={18} />, tooltip: 'Numbered List', action: () => insertMarkdown('1. ', '', 'List item') },
        { icon: <Quote size={18} />, tooltip: 'Quote', action: () => insertMarkdown('> ', '', 'Quote text') },
      ]
    },
    {
      group: 'Media',
      buttons: [
        { icon: <LinkIcon size={18} />, tooltip: 'Link', action: () => insertMarkdown('[', '](url)', 'link text') },
        { icon: <ImageIcon size={18} />, tooltip: 'Image', action: () => insertMarkdown('![', '](image-url)', 'alt text') },
      ]
    }
  ];

  const codeLanguages = [
    { name: 'JavaScript', value: 'javascript' },
    { name: 'Java', value: 'java' },
    { name: 'Python', value: 'python' },
    { name: 'SQL', value: 'sql' },
    { name: 'HTML', value: 'html' },
    { name: 'CSS', value: 'css' },
    { name: 'Bash', value: 'bash' },
    { name: 'JSON', value: 'json' },
  ];

  return (
    <>
      <div className="markdown-toolbar">
        {toolbarButtons.map((group, groupIndex) => (
          <div key={groupIndex} className="toolbar-group">
            {group.buttons.map((button, btnIndex) => (
              <button
                key={btnIndex}
                type="button"
                className={typeof button.icon === 'string' ? 'toolbar-button text-btn' : 'toolbar-button'}
                onClick={button.action}
                title={button.tooltip}
              >
                {button.icon}
              </button>
            ))}
          </div>
        ))}
        
        <div className="toolbar-group code-block-dropdown">
          <select
            onChange={(e) => {
              if (e.target.value) {
                insertCodeBlock(e.target.value);
                e.target.value = '';
              }
            }}
            className="code-language-select"
            defaultValue=""
          >
            <option value="" disabled>Code Block</option>
            {codeLanguages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-button help-btn"
            onClick={() => setShowGuide(true)}
            title="Formatting Help"
          >
            <HelpCircle size={18} />
          </button>
        </div>
      </div>
      
      <FormatGuide show={showGuide} onClose={() => setShowGuide(false)} />
    </>
  );
};

export default MarkdownToolbar;
