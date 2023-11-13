import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CidadeController, PersonsController, UsersController } from './../controllers'
import { Autenticated } from '../shared/middlewares';

const router = Router();

router.get('/', (req, res) => {
  return res.status(StatusCodes.OK).send('API feita com nodeJs e TypeScript')
})

// router -- Citys
router.get('/citys', Autenticated, CidadeController.getAllValidation, CidadeController.getAll)
router.get('/citys/:id', Autenticated, CidadeController.getIdValidation, CidadeController.getByID)
router.post('/citys', Autenticated, CidadeController.createValidation , CidadeController.create)
router.put('/citys/:id', Autenticated, CidadeController.updateValidation , CidadeController.updateById)
router.delete('/citys/:id', Autenticated, CidadeController.deleteValidation, CidadeController.deleteById)

// router --- Persons
router.get('/persons', Autenticated, PersonsController.getAllValidation, PersonsController.getAll)
router.get('/persons/:id', Autenticated, PersonsController.getByValidation, PersonsController.getById)
router.post('/persons', Autenticated, PersonsController.createValidation, PersonsController.create)
router.put('/persons/:id', Autenticated, PersonsController.updateValidation, PersonsController.update)
router.delete('/persons/:id', Autenticated, PersonsController.deleteValidation, PersonsController.deleteById)

// router --- Users
router.post('/signIn', UsersController.singInValidation, UsersController.singIn)
router.post('/singUp', UsersController.singUpValidation, UsersController.singUp)

export { router }