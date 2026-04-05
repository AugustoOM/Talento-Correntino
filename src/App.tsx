import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { PublicLayout } from './components/layout/PublicLayout'
import { SellerLayout } from './components/layout/SellerLayout'
import { SellerGuard } from './routes/SellerGuard'
import { HomePage } from './pages/HomePage'
import { ShopPage } from './pages/ShopPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ConfirmationPage } from './pages/ConfirmationPage'
import { SellerLoginPage } from './pages/SellerLoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { SellerProductsPage } from './pages/SellerProductsPage'
import { SellerSalesPage } from './pages/SellerSalesPage'
import { SellerReportsPage } from './pages/SellerReportsPage'

function ProductDetailRoute() {
  const { slug } = useParams()
  return <ProductDetailPage key={slug} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="tienda" element={<ShopPage />} />
          <Route path="tienda/:slug" element={<ProductDetailRoute />} />
          <Route path="carrito" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="confirmacion" element={<ConfirmationPage />} />
        </Route>

        <Route path="vendedor/login" element={<SellerLoginPage />} />

        <Route
          path="vendedor"
          element={
            <SellerGuard>
              <SellerLayout />
            </SellerGuard>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="productos" element={<SellerProductsPage />} />
          <Route path="ventas" element={<SellerSalesPage />} />
          <Route path="reportes" element={<SellerReportsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
