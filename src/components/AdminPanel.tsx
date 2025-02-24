'use client'
import { fetchAllCars } from '@/lib/apiRequest';
import { getLocal, translateColor } from '@/lib/fn';
import { useCarStore } from '@/store/useCarStore';
import { Car } from "@/types/Car";
import { FC, useEffect, useState } from "react";

interface AdminPanelProps {
	allCars: Car[];
}

const AdminPanel: FC<AdminPanelProps> = ({ allCars = [] }) => {

	const { cars, setCars } = useCarStore()
	const [encarIds, setEncarIds] = useState<string[]>([])
	const [encarId, setEncarId] = useState<string>('')
	const [token] = useState<string>(() => getLocal("token") || "");

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setCars(allCars);
		setLoading(false);
	}, [allCars, setCars]); // ✅ Теперь useEffect запустится при изменении allCars



	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value.startsWith('https://fem.encar.com/cars/detail/')) {
			const match = value.match(/\/detail\/(\d{8})/);
			const id = match ? match[1] : null;

			if (id) {
				setEncarId(id);
				return; // Чтобы не перезаписывать правильный ID
			}
		} else if (value.startsWith('http://www.encar.com/dc/dc_cardetailview.do')) {
			const match = value.match(/[?&]carid=(\d{8})/);
			const id = match ? match[1] : null;

			if (id) {
				setEncarId(id);
				return; // Чтобы не перезаписывать правильный ID
			}
		} else {
			if (/^\d{1,8}$/.test(value)) { // Разрешаем только цифры, максимум 8 символов
				setEncarId(value);
			}
		}
	};



	const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleAdd()
		}
	}

	const handleAdd = () => {
		if (encarId.length < 8) {
			alert('encar ID состоит из 8 цифр');
			setEncarId('');
			return;
		}

		setEncarIds((prev) => {
			if (prev.includes(encarId)) {
				alert('Этот encar ID уже добавлен');
				return prev; // Возвращаем без изменений, если ID уже есть
			}
			return [...prev, encarId];
		});

		setEncarId('');
	};


	const handleRemove = (value: string) => {
		setEncarIds(prevItems => prevItems.filter(item => item !== value));
	};

	const handleSave = async () => {

		setLoading(true)
		try {

			if (encarIds.length === 0 || !token) {
				return
			}
			// console.log(token);

			const res = await fetchAllCars(encarIds, token)
			console.log(res);

			setEncarIds([])

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
								type="text"
								value={encarId}
								onChange={handleChange}
								onKeyDown={handleEnterPress}
								disabled={loading}
							/>

							<button
								onClick={handleAdd}
								disabled={loading}
							>
								Добавить ID
							</button>
						</div>
						<div className=" d-flex flex-wrap gap-2">
							{encarIds.map(el => (
								<span key={el} className=' encarId d-flex align-items-center gap-2'>
									<span className='  lh-1'>{el}</span>
									<span
										className='remove_encarId lh-1'
										onClick={() => handleRemove(el)}
									>&times;</span>
								</span>
							))}
						</div>
					</div>
					<button
						onClick={handleSave}
						disabled={loading}
					>
						Сохранить в базу
					</button>
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
