import { RecoverUserInfo } from '@controllers/users/RecoverUserInfo';
import express from 'express';
import {
  CreateAddressController,
  DeleteAddressController,
  ListAddressByUserIdController,
  UpdateAddressController
} from './controllers/address';
import { CreateAttendanceController } from './controllers/attendance/CreateAttendanceController';
import { DeleteAttendanceController } from './controllers/attendance/DeleteAttendanceController';
import { ListAttendanceByUserIdController } from './controllers/attendance/ListAttendanceByUserIdController';
import {
  CreateUserControler,
  DeleteUserController,
  ListUsersController,
  LoadUserByIdController,
  LoadUserWithAddressController,
  UpdateUserController
} from './controllers/users';
import { LoginUserController } from './controllers/users/LoginUserController';
const router = express.Router();

const listUsersController = new ListUsersController();
const createUserController = new CreateUserControler();
const deleUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const loadUserWithAddressController = new LoadUserWithAddressController();
const loadUserByIdController = new LoadUserByIdController();
const recoverUserInfo = new RecoverUserInfo();

const createAddressController = new CreateAddressController();
const listAddressByUserIdController = new ListAddressByUserIdController();
const deleteAddressController = new DeleteAddressController();
const updateAddressController = new UpdateAddressController();

const createAttendanceController = new CreateAttendanceController();
const listAttendancesByUserIdController =
  new ListAttendanceByUserIdController();
const deleteAttendanceController = new DeleteAttendanceController();
const loginUserController = new LoginUserController();

router.get('/', (req, res) => {
  res.json({ message: 'pedrao' });
});

// USER CRUD ROUTES
router.get('/users', async (req, res) => {
  const users = await listUsersController.execute();
  res.status(200).json({ users });
});

router.get('/users/:email', async (req, res) => {
  const email = req.params.email;
  const user = await loadUserWithAddressController.execute(email);
  res.status(200).json({ user });
});

router.get('/users/load/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await loadUserByIdController.execute(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/users/create-user', async (req, res) => {
  const { cpf, email, password, full_name } = req.body;
  try {
    const user = await createUserController.execute({
      cpf,
      email,
      password,
      full_name,
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// LOGIN USER
router.post('/user/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const login = await loginUserController.execute(email, password);
    res.status(200).json({ login });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/user/recover-user', async (req, res) => {
  const { token } = req.body;
  try {
    const user = await recoverUserInfo.handle(token);
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

router.get('/addresses/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const addresses = await listAddressByUserIdController.execute(id);
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

// ATTENDANCE CRUD ROUTES
router.post('/attendances/create-attendance', async (req, res) => {
  const { description, userId } = req.body;
  try {
    const attendance = await createAttendanceController.execute({
      description,
      userId,
    });
    res.status(200).json({ attendance });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/attendances/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const attendances = await listAttendancesByUserIdController.execute(id);
    res.status(200).json({ attendances });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/attendances/delete-attendance', async (req, res) => {
  const { id } = req.body;
  try {
    const attendance = await deleteAttendanceController.execute(id);
    res.status(200).json({ attendance });
  } catch (error) {
    res.status(400).json({ error });
  }
});

export { router };
