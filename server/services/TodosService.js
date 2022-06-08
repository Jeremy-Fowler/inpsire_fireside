import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class TodosService {
  async edit(body) {
    const todo = await dbContext.Todos.findById(body.id)

    // NOTE check whether the client sent something up, change it to what the client supplied if they did
    todo.completed = body.completed !== null ? body.completed : todo.completed

    // NOTE only let the client edit what you want them to be able to
    // todo.user = body.user || todo.user

    // NOTE this can only flip a boolean to true
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