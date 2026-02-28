
const Container = ({ children, className = "" }) => {
  return (
    <div className={`w-full px-4 sm:px-6 lg:px-12 xl:px-16 ${className}`}>
      {children}
    </div>
  );
};

export default Container