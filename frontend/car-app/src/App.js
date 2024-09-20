import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import './App.css';


export const  App = () => {
  return (
    <div className="App">
      <RouterProvider router={router}> </RouterProvider>
    </div>
  );
}

export default App;
