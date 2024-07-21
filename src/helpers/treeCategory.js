export function treeCategory(record) {
  const parentCategory = [];

  record.forEach(item => {
    if (item.parent_id === '') {
      parentCategory.push(item);
      item.children = []
    }
  });

  record.forEach(item => {
    parentCategory.forEach(parent_item => {
      if (item.parent_id === parent_item._id) {
        parent_item.children.push(item);
      }
    })
  });

  return parentCategory;
}