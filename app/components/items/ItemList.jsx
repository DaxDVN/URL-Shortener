import ItemTempPlate from "./ItemTemplate";

function ItemList({ listUrl }) {
  return (
    <ul id="url-list">
      {listUrl.map((url) => (
        <li key={url.id}>
          <ItemTempPlate
            id={url.id}
            short={url.short}
            long={url.long}
            create_at={url.created_at}
          />
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
