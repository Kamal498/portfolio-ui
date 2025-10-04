# Formatting Test Guide

Copy and paste these examples into your blog editor to test each formatting option.

## Test 1: Basic Formatting

```markdown
**This is bold text**

*This is italic text*

<u>This is underlined text</u>

`This is inline code`
```

## Test 2: Combined Formatting (Click the combined buttons or type)

```markdown
***This is bold and italic***

**<u>This is bold and underlined</u>**

<u><em>This is italic and underlined</em></u>

<u><strong><em>This is bold, italic, and underlined</em></strong></u>
```

## Test 3: Headers with Formatting

```markdown
# Plain Header 1

## <h2><strong>Bold Header 2</strong></h2>

### <h3><em>Italic Header 3</em></h3>

<h2><u>Underlined Header 2</u></h2>

<h2><strong><u>Bold Underlined Header 2</u></strong></h2>

<h3><em><u>Italic Underlined Header 3</u></em></h3>
```

**Important:** When using HTML tags like `<h2>`, you must use HTML tags for formatting:
- Use `<strong>` for bold (not `**`)
- Use `<em>` for italic (not `*`)
- Use `<u>` for underline

## Test 4: Code Blocks (Use dropdown)

### JavaScript
```javascript
function hello() {
  console.log('Hello World!');
}
```

### Java
```java
public class Test {
    public static void main(String[] args) {
        System.out.println("Hello!");
    }
}
```

### SQL
```sql
SELECT * FROM users WHERE active = true;
```

## Test 5: Lists with Formatting

```markdown
- **Bold item**
- *Italic item*
- <u>Underlined item</u>
- ***Bold italic item***

1. First **bold** item
2. Second *italic* item
3. Third <u>underlined</u> item
```

## How to Test:

1. Go to http://localhost:5173/blog/create
2. Copy any example above
3. Paste into the content field
4. Click **Preview** button
5. Verify formatting appears correctly
6. Click **Edit** to continue

## Using Toolbar Buttons:

### For Combined Formatting:
1. Type your text first
2. Select the text
3. Click the **`**<u>`** button (bold + underline)
4. Or click **`***`** button (bold + italic)
5. Or click **`*<u>`** button (italic + underline)

### For Headers:
1. Place cursor at start of line
2. Click H1, H2, or H3 button
3. Type your header text

### For Code Blocks:
1. Click "Code Block" dropdown
2. Select language (JavaScript, Java, Python, etc.)
3. Type or paste your code
4. The syntax highlighting will apply automatically

## Keyboard Shortcuts (Manual):

You can also type markdown directly:
- Bold: `**text**`
- Italic: `*text*` or `_text_`
- Underline: `<u>text</u>`
- Bold + Italic: `***text***`
- Bold + Underline: `**<u>text</u>**`
- Code: `` `code` ``

## Need Help?

Click the green **?** (Help) button in the toolbar to see the formatting guide popup.
