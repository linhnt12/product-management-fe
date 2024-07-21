export function treeSelect(record) {
  const treeData = [
    {
      value: "",
      title: "-- Chọn danh mục -- "
    }
  ];

  record.map(item => {
    const data = {};
    data.children = [];
    data.value = item._id;
    data.title = item.title;
    item.children.map(item_child => {
      const data_child = {};
      data_child.value = item_child._id;
      data_child.title = item_child.title;
      data.children.push(data_child);
    })
    treeData.push(data);
  })

  return treeData;
}