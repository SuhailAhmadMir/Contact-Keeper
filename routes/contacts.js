const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check')

const User = require('../models/User')
const Contact = require('../models/Contact')
// @router  GET /api/contacts
// @desc    Get contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    })
    res.json(contacts)
  } catch (err) {
    console.err(err.message)
    res.status(500).send('Server Error')
  }
})

// @router  POST /api/contacts
// @desc    Add contact
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: console.errors.array() })
    }

    const { name, email, phone, type } = req.body

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      })
      // saves into database
      const contact = await newContact.save()

      res.json(contact)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @router  PUT /api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update contact')
})

// @router  DELETE /api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('delete a contact')
})

module.exports = router
