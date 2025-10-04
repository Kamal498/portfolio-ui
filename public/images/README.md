# Portfolio Images

## 📁 Folder Structure

Place your images in this folder to use them in your portfolio:

```
public/images/
├── profile.jpg          # Your profile photo (recommended: 400x400px)
├── project1.jpg         # Project screenshots
├── project2.jpg
└── ... more images
```

## 🖼️ Image Guidelines

### Profile Photo
- **Recommended size**: 400x400px (square)
- **Format**: JPG or PNG
- **File name**: `profile.jpg` or `profile.png`
- **Max size**: 500KB for faster loading

### Project Images
- **Recommended size**: 1200x800px (3:2 ratio)
- **Format**: JPG or PNG
- **File names**: `project1.jpg`, `project2.jpg`, etc.
- **Max size**: 1MB each

## 📝 How to Add Your Images

### Step 1: Copy your images here
```bash
cp /path/to/your/photo.jpg public/images/profile.jpg
cp /path/to/project-screenshot.jpg public/images/project1.jpg
```

### Step 2: Update database with image paths

**For profile photo:**
```sql
UPDATE personal_info SET avatar = '/images/profile.jpg' WHERE id = 1;
```

**For project images:**
```sql
UPDATE projects SET image = '/images/project1.jpg' WHERE title = 'Your Project Name';
```

Or use DBeaver to update the `avatar` and `image` columns.

### Step 3: Commit to git
```bash
git add public/images/
git commit -m "Add portfolio images"
git push origin main
```

## 🚀 Deployment

When you deploy your frontend:
- Images will be served from: `yourdomain.com/images/profile.jpg`
- No additional configuration needed
- Works automatically with Vercel, Netlify, etc.

## 💡 Tips

1. **Optimize images before uploading** (use TinyPNG.com or similar)
2. **Use descriptive file names** (project-ecommerce.jpg, not IMG_1234.jpg)
3. **Keep images under 500KB** for fast loading
4. **Use same aspect ratio** for all project images for consistency

## 🔗 Alternative: External Hosting

If you prefer to use external image hosting:
- Upload to Imgur, Cloudinary, or similar
- Use full URLs in database: `https://i.imgur.com/abc123.jpg`
- No need to commit images to git
