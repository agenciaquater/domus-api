import express from 'express';

const cuponsModule = express.Router()

cuponsModule.get('/', (req, res) => {
  res.send('pedrao')
})

export { cuponsModule };
