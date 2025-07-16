import express from 'express'
import Book from '../models/Book.js'

const router = express.Router()

/**
 * POST route to create new book
 */
router.post('/', async (req, res) => {
  try {
    const newBook = new Book(req.body)
    const savedBook = await newBook.save()
    res.status(201).json(savedBook)
  } catch (error) {
    console.error('Error creating book: ', error)
    res.status(400).json({ message: error.message })
  }
})

/**
 * GET route to retrieve all books
 */
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({})
    res.status(200).json(books)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error retrieving books' })
  }
})

/**
 * GET route to retrieve a book by ID
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const book = await Book.findById(id)
    if (!book) {
      return res.status(404).json({ message: 'Book could not be located' })
    }
    res.status(200).json(book)
  } catch (error) {
    console.error('Error retrieving book: ', error)
    res.status(500).json({ message: error.message })
  }
})

/**
 * PUT route to update a book by ID
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book cannot be located' })
    }
  } catch (error) {
    console.error('Error updating book: ', error)
    return res.status(400).json({ message: error.message })
  }
})

/**
 * DELETE route to delete a book by ID
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deletedBook = await Book.findByIdAndDelete(id)
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book cannot be located' })
    }
    res.json(deletedBook)
  } catch (error) {
    console.error('Error deleting book: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
