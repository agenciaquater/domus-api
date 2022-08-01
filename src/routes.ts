import express from 'express';
import {
  CreateUserControler,
  DeleteUserController,
  ListUsersController,
  UpdateUserController,
} from './controllers/users';
const router = express.Router();

const listUsersController = new ListUsersController();
const createUserController = new CreateUserControler();
const deleUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();

router.get('/', (req, res) => {
  res.json({ message: 'pedrao' });
});

router.get('/users', async (req, res) => {
  const users = await listUsersController.execute();
  res.status(200).json({ users });
});

router.post('/users/create-user', async (req, res) => {
  const { cpf, email, password } = req.body;
  try {
    const user = await createUserController.execute({
      cpf,
      email,
      password,
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/users/delete-user', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await deleUserController.execute(email);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/users/update-user', async (req, res) => {
  const { data } = req.body;
  try {
    const user = await updateUserController.execute(data);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

export { router };
