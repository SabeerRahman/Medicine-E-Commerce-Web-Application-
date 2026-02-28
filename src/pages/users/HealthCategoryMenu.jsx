import { healthCategories } from "./userUtils";

const HealthCategoryMenu = () => {
  return (
    <div className="flex items-center lg:gap-4 xl:gap-8 overflow-y-auto">
          {healthCategories.map((category) => (
            <h1
              key={category.id}
              className="font-medium text-dark-gray font-nunito cursor-pointer whitespace-nowrap"
            >
              {category.label}
            </h1>
          ))}
        </div>
  );
};

export default HealthCategoryMenu;