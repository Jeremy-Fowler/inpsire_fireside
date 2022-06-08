import { todosService } from "../services/TodosService";
import BaseController from "../utils/BaseController";

export class TodosController extends BaseController {
  constructor () {
    super('api/:name/todos')
    this.router
      .get('', this.getAll)
      .post('', this.monkey)
      .delete('/:todoId', this.remove)
      .put('/:id', this.edit)
  }
  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const todo = await todosService.edit(req.body)
      return res.send(todo)
    } catch (error) {
      next(error)
    }
  }
  async monkey(req, res, next) {
    try {
      req.body.user = req.params.name
      const todo = await todosService.createMonkey(req.body)
      return res.send(todo)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {
      const todos = await todosService.getAll(req.params.name)
      return res.send(todos)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await todosService.remove(req.params.name, req.params.todoId)
      return res.send('Delorted')
    } catch (error) {
      next(error)
    }
  }
}