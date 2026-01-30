import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'


export function TaskForm() {


const [title, setTitle] = useState('')
const queryClient = useQueryClient()


const createTask = async (newTask) => {
const response = await api.post('/todos', newTask)
return response.data
}


const mutation = useMutation({
mutationFn: createTask,
onSuccess: () => {
queryClient.invalidateQueries(['tasks'])
setTitle('')
}
})


const handleSubmit = (e) => {
e.preventDefault()


mutation.mutate({
title: title,
completed: false,
userId: 1
})
}


return (
<form onSubmit={handleSubmit}>
<input
type="text"
placeholder="Nova tarefa"
value={title}
onChange={(e) => setTitle(e.target.value)}
required
/>


<button type="submit">Adicionar</button>


{mutation.isLoading && <p>salvando...</p>}
{mutation.isError && <p>erro ao salvar</p>}
{mutation.isSuccess && <p>tarefa criada!</p>}
</form>
)
}
