# Category & Tag System Documentation

## Overview

The Learn-Up platform uses a hierarchical category and tag system to organize programs and enable advanced filtering and recommendations.

## Structure

```
Category (One)
  └── Tags (Many)
        └── Programs (Many)
```

- **One Category** can have **multiple Tags**
- **One Program** belongs to **one Category**
- **One Program** can have **multiple Tags**
- **Tags must belong to a Category**

## Example

```
Category: Sports & Fitness
  Tags:
    - Football
    - Yoga
    - Cricket
    - Martial Arts
    - Swimming

Category: Arts & Crafts
  Tags:
    - Painting
    - Drawing
    - Pottery
    - Origami
```

## Models

### Category Model
- `name` - Category name (unique)
- `slug` - URL-friendly identifier (auto-generated)
- `description` - Category description
- `icon` - Icon URL or name
- `image` - Category image URL
- `isActive` - Active status
- `order` - Display order

### Tag Model
- `name` - Tag name (unique)
- `slug` - URL-friendly identifier (auto-generated)
- `category` - Reference to Category (required)
- `description` - Tag description
- `isActive` - Active status
- `usageCount` - Number of programs using this tag

### Program Model (Updated)
- `category` - Reference to Category (ObjectId, required)
- `tags` - Array of Tag references (ObjectIds)
- All other program fields remain the same

### Student Model (Updated)
- `interests` - Array of Tag references (what the kid likes)
- `skillLevels` - Array of { tag, level } objects for skill tracking

## API Endpoints

### Categories

#### Get All Categories
```
GET /api/categories?active=true
```

#### Get Category by ID (with Tags)
```
GET /api/categories/:id
Returns: Category with populated tags array
```

#### Create Category (Admin only)
```
POST /api/categories
Body: {
  name: "Sports & Fitness",
  description: "...",
  icon: "...",
  order: 1
}
```

#### Update Category (Admin only)
```
PUT /api/categories/:id
```

#### Delete Category (Admin only)
```
DELETE /api/categories/:id
Note: Cannot delete if tags exist
```

### Tags

#### Get All Tags
```
GET /api/tags?category=categoryId&active=true
```

#### Get Tags by Category
```
GET /api/tags/category/:categoryId
```

#### Get Tag by ID
```
GET /api/tags/:id
```

#### Create Tag (Admin only)
```
POST /api/tags
Body: {
  name: "Football",
  category: "categoryId",
  description: "..."
}
```

#### Update Tag (Admin only)
```
PUT /api/tags/:id
```

#### Delete Tag (Admin only)
```
DELETE /api/tags/:id
Note: Cannot delete if used in programs
```

## Filtering & Search

### Program Filtering

The programs endpoint now supports advanced filtering:

```
GET /api/programs?
  category=categoryId&
  tags=tagId1,tagId2,tagId3&
  ageMin=5&
  ageMax=12&
  priceMin=100&
  priceMax=5000&
  locationType=online&
  tutor=tutorId&
  level=beginner&
  hasAvailability=true&
  search=football&
  sortBy=rating&
  sortOrder=desc&
  page=1&
  limit=20
```

**Query Parameters:**
- `category` - Filter by category ID
- `tags` - Filter by tags (comma-separated tag IDs)
- `ageMin` / `ageMax` - Age range filtering
- `priceMin` / `priceMax` - Price range filtering
- `locationType` - online, in_person, both
- `tutor` - Filter by tutor ID
- `level` - beginner, intermediate, advanced, all
- `hasAvailability` - Only show programs with available batches
- `search` - Search in title, description
- `sortBy` - createdAt, price, rating, title
- `sortOrder` - asc, desc
- `page` - Page number for pagination
- `limit` - Results per page

**Response:**
```json
{
  "programs": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5
  }
}
```

### Recommendations

Get personalized program recommendations for a student based on their interests:

```
GET /api/programs/recommendations/:studentId
Headers: Authorization: Bearer <token>
```

**Logic:**
1. Gets student's age and interests (tags)
2. Finds programs matching:
   - Age range (program ageMin <= studentAge <= program ageMax)
   - Student's interest tags
3. Scores programs by:
   - Number of matching tags
   - Program rating
4. Returns top 12 recommendations sorted by relevance

**Response:**
```json
{
  "programs": [
    {
      ...programData,
      "recommendationScore": 3,
      "matchingTags": 3
    }
  ],
  "studentAge": 8,
  "interests": [...]
}
```

## Usage Examples

### Creating Categories & Tags

1. **Create Category:**
```json
POST /api/categories
{
  "name": "Sports & Fitness",
  "description": "Physical activities and sports programs",
  "icon": "sports-icon",
  "order": 1
}
```

2. **Create Tags for Category:**
```json
POST /api/tags
{
  "name": "Football",
  "category": "categoryId_from_step_1",
  "description": "Football training programs"
}
```

### Creating Programs with Categories & Tags

```json
POST /api/programs
{
  "title": "Junior Football Training",
  "category": "sportsCategoryId",
  "tags": ["footballTagId1", "fitnessTagId2"],
  "ageMin": 6,
  "ageMax": 12,
  "price": 2000,
  ...
}
```

### Setting Student Interests

```json
PUT /api/students/:studentId
{
  "interests": ["footballTagId", "cricketTagId", "swimmingTagId"]
}
```

## Benefits

1. **Better Organization** - Programs organized hierarchically
2. **Advanced Filtering** - Multi-tag filtering, price range, etc.
3. **Personalization** - Recommendations based on student interests
4. **Scalability** - Easy to add new categories and tags
5. **Reusability** - Tags can be used across multiple programs
6. **Analytics** - Track popular tags and categories

