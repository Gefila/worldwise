import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountriesList from "./components/CountryList";
import City from "./components/City";

const BASE_URL = 'http://localhost:8000'

function App() {
	const [cities, setCities] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(()=>{
		async function fetchCities(){
			try{
				setIsLoading(true)
				const res = await fetch(`${BASE_URL}/cities`)
				const data = await res.json()
				setCities(data)
			}catch{
				console.error('Error fetching data')
			}finally{
				setIsLoading(false)
			}
		}

		fetchCities()
	},[])

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="app" element={<AppLayout />}>
					<Route index element={<CityList cities={cities} isLoading={isLoading}/>} />	
					<Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
					<Route path="countries" element={<CountriesList cities={cities} isLoading={isLoading}/>} />
					<Route path="cities/:id" element ={<City/>}/>
				</Route>
				<Route path="login" element={<Login />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
