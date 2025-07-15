import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

/**
 * POST route to create new book
 */



/**
 * GET route to retrieve all books
 */



/**
 * GET route to retrieve a book by ID
 */



/**
 * PUT route to update a book by ID
 */




/**
 * DELETE route to delete a book by ID
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book cannot be located' });
        }
        res.json(deletedBook)
    } catch (error) {
        console.error('Error deleting book: ', error);
        res.status(500).json({ message: 'Internal server error' })
    }
})








export default router;
