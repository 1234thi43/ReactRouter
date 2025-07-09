// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react';
import './App.module.css';
import {
	Routes,
	Route,
	NavLink,
	Outlet,
	useParams,
	useMatch,
	useNavigate,
	useRoutes,
} from 'react-router-dom';

const database = {
	productList: [
		{ id: 1, name: 'Телевизор' },
		{ id: 2, name: 'Компьютер' },
		{ id: 3, name: 'Телефон' },
	],
	products: {
		1: { id: 1, name: 'Телевизор', price: 29999, amount: 20 },
		2: { id: 2, name: 'Компьютер', price: 57500, amount: 3 },
		3: { id: 3, name: 'Телефон', price: 10900, amount: 106 },
	},
};

const fetchProductList = () => database.productList;

const fetchProduct = (id) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(database.products[id]);
		}, 2500);
	});

const MainPage = () => (
	<div>
		<h1>Главная страница контент</h1>
	</div>
);
const Catalog = () => (
	<div>
		<h3>Каталоги</h3>
		<ul>
			{fetchProductList().map(({ id, name }) => (
				<li key={id}>
					<NavLink to={`product/${id}`}>{name}</NavLink>
				</li>
			))}
		</ul>
		<Outlet />
	</div>
);
const ProductNotFound = () => <h2>Продукт не найден</h2>;
const ProductLoadError = () => <h2>Ошибка загрузки товара. Попробуйте еще раз позже</h2>;
const Product = () => {
	const [product, setProduct] = useState(null);
	const params = useParams();
	const navigate = useNavigate();

	const urlMatchData = useMatch('/catalog/:type/:id');

	console.log(urlMatchData);

	useEffect(() => {
		let isLoadingTimeout = false;
		let isProductLoading = false;

		setTimeout(() => {
			isLoadingTimeout = true;

			if (!isProductLoading) {
				navigate('/product-load-error', { replace: true });
			}
		}, 5000);

		fetchProduct(params.id).then((loadedProduct) => {
			isProductLoading = true;

			if (!isLoadingTimeout) {
				if (!product) {
					return navigate('/product-not-exist');
				}

				setProduct(loadedProduct);
			}
		});
	}, [params.id, navigate]);

	const { name, price, amount } = product;

	return (
		<div>
			<h2>Товар- {name}</h2>
			<div>Цена товара: {price}</div>
			<div>Осталось на складе: {amount}</div>
			<p>Описание продукта</p>
		</div>
	);
};
const Contacts = () => (
	<div>
		<h1>Наши контакты</h1>
	</div>
);
const NotFound = () => <h2>Такой страницы не существует</h2>;
const ExtendedLink = ({ to, children }) => (
	<NavLink to={to}>
		{({ isActive }) =>
			isActive ? (
				<>
					<span>{children}</span>
					<span>*</span>
				</>
			) : (
				children
			)
		}
	</NavLink>
);

function App() {
	const routes = useRoutes([
		{ path: '/', element: <MainPage /> },
		{
			path: '/catalog',
			element: <Catalog />,
			children: [
				{ path: 'product/:id', element: <Product /> },
				{ path: 'service/:id', element: <Product /> },
			],
		},
	]);

	return (
		<>
			<div>
				<h3>Меню</h3>
				<ul>
					<li>
						<ExtendedLink to="/">Главная</ExtendedLink>
					</li>
					<li>
						<ExtendedLink to="/catalog">Каталог</ExtendedLink>
					</li>
					<li>
						<ExtendedLink to="/contacts">Контакты</ExtendedLink>
					</li>
				</ul>
			</div>
			{/* <Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/catalog" element={<Catalog />}>
					<Route path="product/:id" element={<Product />} />
					<Route path="service/:id" element={<Product />} />
				</Route>
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/product-load-error" element={<ProductLoadError />} />
				<Route path="/product-not-exist" element={<ProductNotFound />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to='/404' replace={true} />} />
			</Routes> */}

			{routes}
		</>
	);
}

export default App;
