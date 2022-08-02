import { CreateAddressController } from '@controllers/address/CreateAddressController';
import { DeleteAddressController } from '@controllers/address/DeleteAddressRepository';
import { ListAddressByUserEmailController } from '@controllers/address/ListAddressByUserEmailController';
import { UpdateAddressController } from '@controllers/address/UpdateAddressController';
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

const createAddressController = new CreateAddressController();
const listAddressByUserEmailController = new ListAddressByUserEmailController();
const deleteAddressController = new DeleteAddressController();
const updateAddressController = new UpdateAddressController();

router.get('/', (req, res) => {
  res.json({ message: 'pedrao' });
});

// USER CRUD ROUTES
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

// ADDRESS CRUD ROUTES
router.post('/addresses/create-address', async (req, res) => {
  const { street, number, apt, neighborhood, state, city, userId } = req.body;
  try {
    const address = await createAddressController.execute({
      street,
      number,
      apt,
      neighborhood,
      state,
      city,
      userId,
    });

    res.status(200).json({ address });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/addresses/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const addresses = await listAddressByUserEmailController.execute(email);
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/addresses/delete-address', async (req, res) => {
  const { id } = req.body;
  try {
    const addresses = await deleteAddressController.execute(id);
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/addresses/update-address', async (req, res) => {
  const { street, number, apt, neighborhood, state, city, id } = req.body;
  try {
    const address = await updateAddressController.execute(
      {
        street,
        number,
        apt,
        neighborhood,
        state,
        city,
      },
      id
    );

    res.status(200).json({ address });
  } catch (error) {
    res.status(400).json({ error });
  }
});

export { router };
