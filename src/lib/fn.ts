/** @format */

import { FilterProps, ModalItem } from "@/components/Filter";
import { Car } from "@/types/Car";
import { UserLogin } from "@/types/User";

export const formatNumber = (number: number) => {
    if (number >= 1000) {
        return (number / 1000).toFixed(1);
    }
    return number.toString();
};

export const translateFuel = (fuel: any) => {
    switch (fuel) {
        case "가솔린":
            return "Бензин";
        case "디젤":
        case "Diesel":
            return "Дизель";
        case "전기":
            return "Электро";
        case "LPG(일반인 구입)":
        case "LPG":
            return "Газ (LPG)";
        case "CNG":
            return "Газ (CNG)";
        case "가솔린+전기":
            return "Гибрид (Бензин + Электро)";
        case "디젤+전기":
            return "Гибрид (Дизель + Электро)";
        case "LPG+전기":
            return "Гибрид (LPG + Электро)";
        case "가솔린+LPG":
            return "Гибрид (Бензин + LPG)";
        case "가솔린+CNG":
            return "Гибрид (Бензин + CNG)";
        case "수소":
            return "Водород";
        case "수소+전기":
            return "Гибрид (Водород + Электро)";
        case "LPG7가솔린+전기":
            return "Гибрид (LPG + Бензин + Электро)";
        default:
            return "Уточните";
    }
};

export const translateTransmission = (transmission: any) => {
    switch (transmission) {
        case "오토":
            return "АКПП";
        case "수동":
            return "МКПП";
        case "세미오토":
            return "Робот";
        case "CVT":
            return "Вариатор";
        case "기타":
            return "Прочее";
        default:
            return "Уточните";
    }
};

export const translateBody = (body: any) => {
    switch (body) {
        case "경차":
            return "Мини-класс";
        case "소형차":
            return "Малый класс";
        case "준중형차":
            return "Компакт-класс";
        case "중형차":
            return "Средний класс";
        case "대형차":
            return "Бизнес-класс";
        case "스포츠카":
            return "Спорт-класс";
        case "SUV":
            return "Внедорожник";
        case "RV":
            return "Минивэн";
        case "경승합차":
            return "Малый микроавтобус";
        case "승합차":
            return "Микроавтобус";
        case "화물차":
            return "Грузовик";
        case "기타":
            return "Прочее";
        default:
            return "Уточните";
    }
};

export const translateColor = (color: any) => {
    switch (color) {
        case "검정색":
            return "Чёрный";
        case "검정투톤":
            return "Чёрный двухцветный";
        case "갈색":
            return "Коричневый";
        case "갈색투톤":
            return "Коричневый двухцветный";
        case "빨간색":
            return "Красный";
        case "쥐색":
        case "회색":
            return "Серый";
        case "노란색":
            return "Жёлтый";
        case "녹색":
            return "Зелёный";
        case "연두색":
            return "Салатовый";
        case "청옥색":
            return "Бирюзовый";
        case "주황색":
            return "Оранжевый";
        case "청색":
            return "Синий";
        case "흰색":
            return "Белый";
        case "흰색투톤":
            return "Белый двухцветный";
        case "진주색":
            return "Перламутровый";
        case "진주투톤":
            return "Перламутровый двухцветный";
        case "은색":
        case "명은색":
            return "Серебристый";
        case "은색투톤":
            return "Серебристый двухцветный";
        case "은하색":
        case "은회색":
            return "Серебристо-серый";
        case "금색":
            return "Золотой";
        case "금색투톤":
            return "Золотой двухцветный";
        case "연금색":
            return "Светло-золотой";
        case "하늘색":
            return "Голубой";
        case "갈대색":
            return "Бежевый";
        case "담녹색":
            return "Тёмно-зелёный";
        case "자주색":
            return "Пурпурный";
        case "보라색":
            return "Фиолетовый";
        case "분홍색":
            return "Розовый";
        default:
            return "Уточните";
    }
};

export const filterTitle = (name: any) => {
    switch (name) {
        case "brand":
            return "Производитель";
        case "model":
            return "Модель";
        case "edition":
            return "Поколение";
        case "fuel":
            return "Тип топлива";
        case "color":
            return "Цвет";
        case "bodyIds":
        case "body":
            return "Кузов";
        case "transmissionIds":
        case "transmission":
            return "КПП";
        case "minYear":
            return "Год от";
        case "maxYear":
            return "Год до";
        case "minPrice":
            return "Цена от";
        case "maxPrice":
            return "Цена до";
        case "minEngine":
            return "Двигатель от";
        case "maxEngine":
            return "Двигатель до";
        case "minMileage":
            return "Пробег от";
        case "maxMileage":
            return "Пробег до";
        case "option":
            return "Опции";
        default:
            return "";
    }
};

export const isNumberArray = (value: number | number[]): value is number[] => {
    return Array.isArray(value);
};

export const searchFilterCar = (
    filters: Partial<FilterProps> = {},
    cars: Car[]
) => {
    const filteredCars = cars.filter((car) => {
        const passed =
            (!filters.brandIds ||
                filters.brandIds.length === 0 ||
                filters.brandIds.includes(car.brand.id)) &&
            (!filters.modelIds ||
                filters.modelIds.length === 0 ||
                filters.modelIds.includes(car.model.id)) &&
            (!filters.editionIds ||
                filters.editionIds.length === 0 ||
                filters.editionIds.includes(car.edition.id)) &&
            (!filters.transmissionIds ||
                filters.transmissionIds.length === 0 ||
                filters.transmissionIds.includes(car.transmission.id)) &&
            (!filters.fuelIds ||
                filters.fuelIds.length === 0 ||
                filters.fuelIds.includes(car.fuel.id)) &&
            (!filters.colorIds ||
                filters.colorIds.length === 0 ||
                filters.colorIds.includes(car.color.id)) &&
            (!filters.bodyIds ||
                filters.bodyIds.length === 0 ||
                filters.bodyIds.includes(car.body.id)) &&
            (!filters.minPrice || car.price >= filters.minPrice) &&
            (!filters.maxPrice || car.price <= filters.maxPrice) &&
            (!filters.minEngine || car.engine.engine >= filters.minEngine) &&
            (!filters.maxEngine || car.engine.engine <= filters.maxEngine) &&
            (!filters.minYear || car.year >= filters.minYear) &&
            (!filters.maxYear || car.year <= filters.maxYear) &&
            (!filters.minMileage || car.mileage >= filters.minMileage) &&
            (!filters.maxMileage || car.mileage <= filters.maxMileage) &&
            (!filters.optionIds ||
                filters.optionIds.length === 0 ||
                car.options.some((option) =>
                    filters.optionIds?.includes(option.id)
                ));

        return passed;
    });

    return filteredCars;
};

export const saveLocal = (data: UserLogin) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
    }
};

export const getLocal = (key: "token" | "role"): string | null => {
    if (typeof window === "undefined") return null; // Проверяем, что код выполняется на клиенте
    return localStorage.getItem(key);
};

export const removeLocal = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};

export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export const resetFilters = () => ({
    modelIds: [],
    minYear: undefined,
    maxYear: undefined,
    minEngine: undefined,
    maxEngine: undefined,
    minMileage: undefined,
    maxMileage: undefined,
    transmissionIds: [],
    bodyIds: [],
    colorIds: [],
});

export const getUniqueSortedData = (data: ModalItem[], key: string) => {
    return [
        ...new Map(data.map((item: any) => [item[key], item])).values(),
    ].sort((a, b) => a[key].localeCompare(b[key]));
};

export function isEmptyObject(obj: FilterProps) {
    return Object.values(obj).every(
        (value) =>
            value === undefined || (Array.isArray(value) && value.length === 0)
    );
}
