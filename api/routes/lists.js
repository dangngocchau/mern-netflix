const router = require('express').Router();
const List = require('../models/List');
const verify = require('../verifyToken');

//CREATE
router.post('/', verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const saveList = await newList.save();
      res.status(200).json(saveList);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('You are not allowed!!!');
  }
});

// DELETE
router.delete('/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json('The list has been deleted...');
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('You are not allowed!!!');
  }
});
// GET LIST
router.get('/', verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];

  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.find();
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});
// UPDATE

router.put('/:id', async (req, res) => {
  try {
    const updateList = await List.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
