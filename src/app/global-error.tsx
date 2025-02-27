'use client' // Error boundaries must be Client Components

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		// global-error must include html and body tags
		<html>
			<body className=' d-flex justify-content-center align-items-center vh-100'>
				<div className=" d-flex justify-content-center align-items-center gap-3 flex-column">
					<h2 className=' text-center'>Проблема с интернет соединением {error.message}</h2>
					<button className='global_error_btn' onClick={() => window.location.reload()}>Перезагрузить</button>
				</div>
			</body>
		</html>
	)
}