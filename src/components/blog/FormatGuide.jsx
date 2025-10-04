import { Info } from 'lucide-react';
import './FormatGuide.css';

const FormatGuide = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="format-guide-overlay" onClick={onClose}>
      <div className="format-guide" onClick={(e) => e.stopPropagation()}>
        <div className="format-guide-header">
          <Info size={20} />
          <h3>Markdown Formatting Guide</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <div className="format-guide-content">
          <section>
            <h4>Headers (use at start of line)</h4>
            <code># Header 1</code>
            <code>## Header 2</code>
            <code>### Header 3</code>
          </section>

          <section>
            <h4>Text Formatting</h4>
            <code>**bold text**</code>
            <code>*italic text*</code>
            <code>***bold and italic***</code>
            <code>&lt;u&gt;underlined&lt;/u&gt;</code>
          </section>

          <section>
            <h4>Combining Formats</h4>
            <code>**&lt;u&gt;bold and underline&lt;/u&gt;**</code>
            <code>*&lt;u&gt;italic and underline&lt;/u&gt;*</code>
            <code>***&lt;u&gt;all three&lt;/u&gt;***</code>
          </section>

          <section>
            <h4>Headers with Formatting (use HTML)</h4>
            <code>&lt;h2&gt;&lt;u&gt;&lt;strong&gt;Underlined Bold Header&lt;/strong&gt;&lt;/u&gt;&lt;/h2&gt;</code>
            <code>&lt;h2&gt;&lt;strong&gt;Bold Header&lt;/strong&gt;&lt;/h2&gt;</code>
            <code>&lt;h3&gt;&lt;em&gt;Italic Header&lt;/em&gt;&lt;/h3&gt;</code>
          </section>

          <section>
            <h4>⚠️ Important Notes</h4>
            <ul>
              <li>Headers must start at the beginning of a line</li>
              <li>You can't use # inside a word for headers</li>
              <li>For complex formatting in headers, use HTML tags</li>
              <li>Always test with Preview mode</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FormatGuide;
