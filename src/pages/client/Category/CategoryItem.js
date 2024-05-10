import "./CategoryItem.scss";

function CategoryItem(props) {
  const { item } = props;

  return (
    <>
      <a href={`/${item.slug}`} style={{color: "black"}}>
        <div className="category__item" key={item.id}>
          <div className="category__image" >
            <img src={item.thumbnail} alt={item.title} />
          </div>
          <p className="category__title">
            {item.title}
          </p>
        </div>
      </a>
    </>
  )
}
export default CategoryItem;