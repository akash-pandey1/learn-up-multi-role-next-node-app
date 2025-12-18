import Category from '../models/Category.js';
import Tag from '../models/Tag.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const { active } = req.query;
    const query = {};

    if (active === 'true') {
      query.isActive = true;
    }

    const categories = await Category.find(query).sort({ order: 1, name: 1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get category by ID with tags
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Get all tags for this category
    const tags = await Tag.find({ category: category._id, isActive: true }).sort({ name: 1 });

    res.json({
      ...category.toObject(),
      tags,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create category - Admin only
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update category - Admin only
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete category - Admin only
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if category has tags
    const tagsCount = await Tag.countDocuments({ category: category._id });
    if (tagsCount > 0) {
      return res.status(400).json({
        message: 'Cannot delete category with associated tags. Delete tags first.',
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({ message: 'Category removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

