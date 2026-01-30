import { TaskList } from './components/TaskList'
import { TaskForm } from './components/TaskForm'


function App() {


return (
<div style={{ padding: '20px' }}>
<h1>Todo List - React Query</h1>


<TaskForm />
<hr />
<TaskList />
</div>
)
}


export default App
