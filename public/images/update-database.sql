-- Update Personal Info with Profile Image
UPDATE personal_info SET avatar = '/images/profile.jpg' WHERE id = 1;

-- Update Project Images
UPDATE projects SET image = '/images/project1.jpg' WHERE title = 'E-Commerce Platform';
UPDATE projects SET image = '/images/project2.jpg' WHERE title = 'Task Management App';
UPDATE projects SET image = '/images/project3.jpg' WHERE title = 'Weather Dashboard';

-- Verify updates
SELECT name, avatar FROM personal_info;
SELECT title, image FROM projects ORDER BY display_order;
