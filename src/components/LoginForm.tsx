"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { User } from '@/types/User';
import { getLocal, saveLocal } from '@/lib/fn';
import { login } from '@/api/user';

export default function LoginForm() {
	const { register, handleSubmit, formState: { errors } } = useForm<User>();
	const [errorMessage, setErrorMessage] = useState("");

	const onSubmit = async (data: User) => {
		try {
			const res = await login(data);
			saveLocal(res)
			const role = getLocal('role')
			if (role === 'ADMIN') {
				window.location.href = '/dashboard'
			}
		} catch (error) {
			setErrorMessage((error as Error).message);
		}
	};

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
			<div className="card p-4 shadow-sm" style={{ width: "350px" }}>
				<h2 className="text-center mb-3">Вход</h2>

				{errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-3">
						<label className="form-label">Email</label>
						<input
							type="text"
							className="form-control"
							{...register("phone", { required: "Введите логин" })}
						/>
						{errors.phone && <small className="text-danger">{errors.phone.message}</small>}
					</div>

					<div className="mb-3">
						<label className="form-label">Пароль</label>
						<input
							type="password"
							className="form-control"
							{...register("password", { required: "Введите пароль" })}
						/>
						{errors.password && <small className="text-danger">{errors.password.message}</small>}
					</div>

					<button type="submit" className="btn btn-primary w-100">Войти</button>
				</form>
			</div>
		</div>
	);
}
