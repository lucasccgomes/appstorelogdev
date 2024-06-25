import PropTypes from 'prop-types';

const CarouselItem = ({ imageSrc, title, year, description, link }) => (
  <div className="flex p-8 flex-col m-4 md:flex-row items-center bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
    <img src={imageSrc} alt={title} className="w-full md:w-1/3 object-cover rounded-2xl shadow-2xl" />
    <div className="p-6 md:w-2/3">
      <h2 className="text-2xl font-bold dark:text-white text-gray-700">{title}</h2>
      <p className="text-gray-600 dark:text-white">Ano • <span className="text-teal-500">{year}</span></p>
      <p className="mt-4 text-gray-700 dark:text-white">{description}</p>
      <a href={link} className="text-teal-500 mt-4 inline-block">Mais</a>
    </div>
   
  </div>
);

CarouselItem.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default CarouselItem;
