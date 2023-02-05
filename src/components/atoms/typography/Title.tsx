type TitleProps = {
  children: string;
};

const Title: React.FC<TitleProps> = ({ children }) => {
  return <h1 className="text-3xl md:text-5xl  text-white">{children}</h1>;
};

export default Title;
