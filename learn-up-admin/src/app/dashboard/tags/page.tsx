'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { tagsAPI, categoriesAPI } from '@/lib/api';

interface Tag {
  _id: string;
  name: string;
  slug: string;
  category: string | { _id: string; name: string };
  description?: string;
  isActive: boolean;
  usageCount: number;
}

interface Category {
  _id: string;
  name: string;
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    isActive: true,
  });

  useEffect(() => {
    fetchTags();
    fetchCategories();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const data = await tagsAPI.getTags();
      setTags(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tags');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoriesAPI.getCategories();
      setCategories(data);
    } catch (err: any) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleOpenDialog = (tag?: Tag) => {
    if (tag) {
      setSelectedTag(tag);
      setFormData({
        name: tag.name,
        category: typeof tag.category === 'string' ? tag.category : tag.category._id,
        description: tag.description || '',
        isActive: tag.isActive,
      });
    } else {
      setSelectedTag(null);
      setFormData({
        name: '',
        category: '',
        description: '',
        isActive: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTag(null);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.category) {
      setError('Name and category are required');
      return;
    }

    try {
      if (selectedTag) {
        await tagsAPI.updateTag(selectedTag._id, formData);
      } else {
        await tagsAPI.createTag(formData);
      }
      handleCloseDialog();
      fetchTags();
    } catch (err: any) {
      setError(err.message || 'Failed to save tag');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) return;

    try {
      await tagsAPI.deleteTag(id);
      fetchTags();
    } catch (err: any) {
      setError(err.message || 'Failed to delete tag');
    }
  };

  const getCategoryName = (category: string | { _id: string; name: string }) => {
    return typeof category === 'string' ? category : category.name;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Tags Management
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Add Tag
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Usage Count</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : tags.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No tags found
                </TableCell>
              </TableRow>
            ) : (
              tags.map((tag) => (
                <TableRow key={tag._id}>
                  <TableCell>{tag.name}</TableCell>
                  <TableCell>{tag.slug}</TableCell>
                  <TableCell>{getCategoryName(tag.category)}</TableCell>
                  <TableCell>{tag.usageCount}</TableCell>
                  <TableCell>
                    <Chip
                      label={tag.isActive ? 'Active' : 'Inactive'}
                      color={tag.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenDialog(tag)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(tag._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedTag ? 'Edit Tag' : 'Add Tag'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedTag ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

