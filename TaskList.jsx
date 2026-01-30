import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'


export function TaskList() {


const queryClient = useQueryClient()


const fetchTasks = async () => {
const response = await api.get('/todos?_limit=10')
return response.data
}


const { data, isLoading, isError, error } = useQuery({
queryKey: ['tasks'],
queryFn: fetchTasks
})


const deleteTask = async (id) => {
await api.delete(`/todos/${id}`)
}


const deleteMutation = useMutation({
mutationFn: deleteTask,
onSuccess: () => {
queryClient.invalidateQueries(['tasks'])
}
})


if (isLoading) return <p>carregando tarefas...</p>


if (isError) return <p>erro: {error.message}</p>


return (
<div>
<h2>Lista de Tarefas</h2>


{data.map(task => (
<div key={task.id} style={{ marginBottom: '10px' }}>
<span>{task.title}</span>


<button
onClick={() => deleteMutation.mutate(task.id)}
style={{ marginLeft: '10px' }}
>
Excluir
</button>
</div>
))}
</div>
)
}
