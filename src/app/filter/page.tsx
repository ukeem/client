
import { seoAltImage } from '@/lib/constants';
import FavoriteLink from '@/components/FavoriteLink';
import Footer from '@/components/Footer';
import FilterProd from '@/components/FilterProd';

export default async function FilterPage() {

	return (
		<>
			<h1 className='main_title'>{`Подбор авто по фильтру | ${seoAltImage}`}</h1>
			<FilterProd />
			<Footer />
			<FavoriteLink />
		</>
	);
}