// import viteLogo from '/vite.svg'
import './App.module.css';
import { Routes, Route, Link, Outlet, useParams } from 'react-router-dom';

const fetchProductList = () => [
	{ id: 1, name: 'Телевизор' },
	{ id: 2, name: 'Компьютер' },
	{ id: 3, name: 'Телефон' },
];

const fetchProduct = (id) =>
	({
		1: { id: 1, name: 'Телевизор', price: 29999, amount: 20 },
		2: { id: 2, name: 'Компьютер', price: 57500, amount: 3 },
		3: { id: 3, name: 'Телефон', price: 10900, amount: 106 },
	})[id];

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
					<Link to={`product/${id}`}>{name}</Link>
				</li>
			))}
		</ul>
		<Outlet />
	</div>
);
const Product = () => {
	const params = useParams()

	const { name, price, amount } = fetchProduct(params.id);

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

function App() {
	return (
		<>
			<div>
				<h3>Меню</h3>
				<ul>
					<li>
						<Link to="/">Главная</Link>
					</li>
					<li>
						<Link to="/catalog">Каталог</Link>
					</li>
					<li>
						<Link to="/contacts">Контакты</Link>
					</li>
				</ul>
			</div>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/catalog" element={<Catalog />}>
					<Route path="product/:id" element={<Product />} />
				</Route>
				<Route path="/contacts" element={<Contacts />} />
			</Routes>
		</>
	);
}

export default App;
