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
  TablePagination,
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
  MenuItem,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { programsAPI } from '@/lib/api';

interface Program {
  _id: string;
  title: string;
  tutor: string | { _id: string; name: string };
  category: string | { _id: string; name: string };
  price: number;
  status: string;
  ageMin: number;
  ageMax: number;
  createdAt: string;
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<any>({ programs: [] });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    status: '',
  });

  useEffect(() => {
    fetchPrograms();
  }, [page, rowsPerPage]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const data = await programsAPI.getPrograms(`page=${page + 1}&limit=${rowsPerPage}`);
      setPrograms(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch programs');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (program: Program) => {
    setSelectedProgram(program);
    setFormData({ status: program.status });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProgram(null);
  };

  const handleUpdate = async () => {
    if (!selectedProgram) return;

    try {
      await programsAPI.updateProgram(selectedProgram._id, formData);
      handleCloseDialog();
      fetchPrograms();
    } catch (err: any) {
      setError(err.message || 'Failed to update program');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;

    try {
      await programsAPI.deleteProgram(id);
      fetchPrograms();
    } catch (err: any) {
      setError(err.message || 'Failed to delete program');
    }
  };

  const getTutorName = (tutor: string | { _id: string; name: string }) => {
    return typeof tutor === 'string' ? tutor : tutor.name;
  };

  const getCategoryName = (category: string | { _id: string; name: string }) => {
    return typeof category === 'string' ? category : category.name;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'default';
      case 'archived':
        return 'error';
      default:
        return 'default';
    }
  };

  const programsList = programs.programs || [];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Programs Management
        </Typography>
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
              <TableCell>Title</TableCell>
              <TableCell>Tutor</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Age Range</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : programsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No programs found
                </TableCell>
              </TableRow>
            ) : (
              programsList.map((program: Program) => (
                <TableRow key={program._id}>
                  <TableCell>{program.title}</TableCell>
                  <TableCell>{getTutorName(program.tutor)}</TableCell>
                  <TableCell>{getCategoryName(program.category)}</TableCell>
                  <TableCell>₹{program.price}</TableCell>
                  <TableCell>
                    {program.ageMin}-{program.ageMax} years
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={program.status}
                      color={getStatusColor(program.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(program.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenDialog(program)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(program._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={programs.pagination?.total || 0}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Program Status</DialogTitle>
        <DialogContent>
          {selectedProgram && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Title"
                value={selectedProgram.title}
                disabled
                margin="normal"
              />
              <TextField
                fullWidth
                select
                label="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                margin="normal"
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </TextField>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

