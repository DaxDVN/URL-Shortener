import ItemTempPlate from "./ItemTemplate";

function ItemList({ listUrl, domain }) {
  return (
    <ul id="url-list">
      {listUrl.map((url) => (
        <li key={url.id}>
          <ItemTempPlate
            id={url.id}
            short={domain + url.short}
            long={url.long}
            create_at={url.created_at}
          />
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
