import Left from "@/components/detail/property/details/Left";
import Right from "@/components/detail/property/details/Right";

const PropertyDetail = ({
  title,
  description,
  thumbnail,
  gallery,
  isLoading,
  creator,
  isMobile,
  galleryPreview,
  content,
  location,
  features,
  reviews,
  
}) => {
  console.log(galleryPreview)
  return (
    <div
      className={`relative dark:text-gray-100 rounded-lg shadow-lg  grid ${
        isMobile ? "grid-cols-1" : "md:grid-cols-2 grid-cols-1"
      } gap-8  `} 
    >
      <Left  gallery={galleryPreview} />
      <Right title={title} content={content} location={location} features={features}  />
    </div>
  );
};

export default PropertyDetail;
