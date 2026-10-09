import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import V2Layout from './components/V2Layout'
import Home from './pages/Home'
import HomeV2 from './pages/HomeV2'
import ContentPage from './pages/ContentPage'

export default function App() {
  return (
    <Routes>
      <Route path="/v2" element={<HomeV2 />} />
      <Route path="/v2" element={<V2Layout />}>
        <Route path="*" element={<ContentPage />} />
      </Route>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<ContentPage />} />
      </Route>
    </Routes>
  )
}
