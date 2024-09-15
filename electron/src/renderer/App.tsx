import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Piano from './app/Piano'
import WaveformVisualizer from './app/square/WaveformVisualizer'
import Smoke from './app/smoke/Smoke'
import Lectures from './app/lectures/Lectures'

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
        { path: 'smoke', element: <Smoke /> },
        { path: 'lectures', element: <Lectures /> }
      ]
    }
  ])
  return <RouterProvider router={router} />
}
