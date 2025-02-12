import Left from "@/components/detail/property/details/Left";
import Right from "@/components/detail/property/details/Right";

const PropertyDetail = ({
  title,
  description,
  thumbnail,
  gallery,
  isLoading,
  creator,
}) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg">
      <Left thumbnail={thumbnail} gallery={gallery} />
      <Right  />
    </div>
  );
};

export default PropertyDetail;
