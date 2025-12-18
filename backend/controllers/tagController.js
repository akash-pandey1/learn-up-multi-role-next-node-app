import Tag from '../models/Tag.js';
import Category from '../models/Category.js';

// @desc    Get all tags
// @route   GET /api/tags
// @access  Public
export const getTags = async (req, res) => {
  try {
    const { category, active } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (active === 'true') {
      query.isActive = true;
    }

    const tags = await Tag.find(query).populate('category', 'name slug').sort({ name: 1 });

    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get tags by category
// @route   GET /api/tags/category/:categoryId
// @access  Public
export const getTagsByCategory = async (req, res) => {
  try {
    const tags = await Tag.find({
      category: req.params.categoryId,
      isActive: true,
    })
      .populate('category', 'name slug')
      .sort({ name: 1 });

    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get tag by ID
// @route   GET /api/tags/:id
// @access  Public
export const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id).populate('category', 'name slug');

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create tag - Admin only
// @route   POST /api/tags
// @access  Private/Admin
export const createTag = async (req, res) => {
  try {
    const { category } = req.body;

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const tag = await Tag.create(req.body);
    const populatedTag = await Tag.findById(tag._id).populate('category', 'name slug');

    res.status(201).json(populatedTag);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Tag name already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update tag - Admin only
// @route   PUT /api/tags/:id
// @access  Private/Admin
export const updateTag = async (req, res) => {
  try {
    if (req.body.category) {
      // Verify category exists
      const categoryExists = await Category.findById(req.body.category);
      if (!categoryExists) {
        return res.status(404).json({ message: 'Category not found' });
      }
    }

    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('category', 'name slug');

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete tag - Admin only
// @route   DELETE /api/tags/:id
// @access  Private/Admin
export const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    // Check if tag is used in any programs
    const Program = (await import('../models/Program.js')).default;
    const programsCount = await Program.countDocuments({ tags: tag._id });
    if (programsCount > 0) {
      return res.status(400).json({
        message: 'Cannot delete tag that is used in programs. Remove from programs first.',
      });
    }

    await Tag.findByIdAndDelete(req.params.id);

    res.json({ message: 'Tag removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

