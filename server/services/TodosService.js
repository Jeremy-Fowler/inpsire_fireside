import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class TodosService {
  async edit(body) {
    const todo = await dbContext.Todos.findById(body.id)
    // NOTE editting booleans is weird in js
    todo.completed = body.completed !== null ? body.completed : todo.completed
    todo.user = body.user || todo.user
    // todo.completed = body.completed || todo.completed
    await todo.save()
    return todo
  }
  async remove(name, todoId) {
    const todo = await dbContext.Todos.findById(todoId)
    if (todo.user.toString() !== name) {
      throw new Forbidden('That is not your todo, bud')
    }
    await todo.delete()
  }
  createMonkey(body) {
    const todo = dbContext.Todos.create(body)
    return todo
  }
  async getAll(name) {
    const todos = await dbContext.Todos.find({ user: name })
    return todos
  }

}

export const todosService = new TodosService()