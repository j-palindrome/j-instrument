import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Piano from './app/Piano'
import WaveformVisualizer from './app/square/WaveformVisualizer'
import Lectures from './app/lectures/Lectures'
import Industrialization from './app/industrialization/Industrialization'
import Player from './app/piano/Player'

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Piano />,
      children: [
        {
          path: 'square',
          element: <WaveformVisualizer />
        },
        { path: 'lectures', element: <Lectures /> },
        { path: 'industrialization', element: <Industrialization /> },
        { path: 'Piano', element: <Player /> }
      ]
    }
  ])
  return <RouterProvider router={router} />
}
