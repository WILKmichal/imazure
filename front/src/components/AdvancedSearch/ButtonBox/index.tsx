
type ButtonBoxProps = {
  category: any;
  labelColor: string;
  index?: number;
  toggleCategoryChoice: Function;
};

const ButtonBox:React.FC<ButtonBoxProps> = ({
  category,
  toggleCategoryChoice,
  index = 0,
  labelColor,
}: ButtonBoxProps) => {
  return (
    <div
      onClick={() => toggleCategoryChoice(category.tag.id)}
      className="tag tag-hover"
      key={index}
      style={{
        backgroundColor: category.choix ? "#94ffa3" : "#e2e2e2",
      }}
    >
      <span style={{ color: category.choix ? "rgb(52, 72, 197)" : labelColor }}>
        {category.tag.name}
      </span>
    </div>
  );
};

export default ButtonBox;
