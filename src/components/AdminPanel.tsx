'use client'
import { getAllCars, saveAllCars } from '@/api/cars';
import { getLocal, translateColor } from '@/lib/fn';
import { Car } from "@/types/Car";
import { FC, useEffect, useState } from "react";

interface AdminPanelProps {
	allCars?: Car[];
}

const AdminPanel: FC<AdminPanelProps> = ({ allCars = [] }) => {


	const [cars, setCars] = useState<Car[]>([]);
	const [url, setUrl] = useState<string>('')
	const [token] = useState<string>(() => getLocal("token") || "");

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchCars = async () => {
			const fetchedCars = await getAllCars();
			setCars(fetchedCars);
		};
		fetchCars();
	}, []);

	const extractCarIds = (htmlString: string): string[] => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(htmlString, "text/html");

		console.log(doc);
		const carRows = doc.querySelectorAll("tr[data-impression]");

		return Array.from(carRows)
			.map(row => row.getAttribute("data-impression")?.split("|")[0] || "") // Заменяем undefined на ""
			.filter(id => id); // Фильтруем пустые строки
	};


	const handleSave = async () => {

		setLoading(true)
		try {

			const ids = extractCarIds(url);


			await saveAllCars(ids, token)
			// const data = await res.json();
			// console.log(data);

			setUrl('')

		} catch (error) {
			alert(error)
		} finally {

			setLoading(false)
		}


	};

	return (
		<>
			<section className="container-fluid p-3 overflow-hidden admin_panel">
				<div className=" d-flex align-items-center justify-content-between">

					<div className=" d-flex flex-column gap-2">

						<div className=" d-flex align-items-center gap-3">
							<input
								type='text'
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								// onKeyDown={handleEnterPress}
								disabled={loading}
							/>

							<button
								onClick={handleSave}
								disabled={loading}
							>
								Добавить URL
							</button>
						</div>
					</div>
				</div>
				<div className="table-responsive admin_panel overflow-y-auto">
					<table className="table position-relative table-striped">
						<thead className="table-dark admin_panel_header_table">
							<tr>
								<th scope="col">#</th>
								<th scope="col">Год</th>
								<th scope="col">Encar ID</th>
								<th scope="col">Марка</th>
								<th scope="col">Модель</th>
								<th scope="col">Поколение</th>
								<th scope="col">Цвет</th>
								<th scope="col">Действия</th>
							</tr>
						</thead>
						<tbody className=' overflow-y-auto'>

							{cars.sort((a, b) => a.year - b.year).map((el, index) => (
								<tr key={el.id}>
									<th scope="row">{index + 1}</th>
									<td>{el.year}</td>
									<td>{el.encarId}</td>
									<td>{el.brand.brand}</td>
									<td>{el.model.model}</td>
									<td>{el.edition.edition}</td>
									<td>{translateColor(el.color.color)}</td>
									<td>Удалить</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</>
	);
};

export default AdminPanel;
