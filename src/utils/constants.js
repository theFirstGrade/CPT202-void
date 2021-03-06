export const PAGE_SIZE = 5 // 每页显示的记录数
export const PAGE_SIZE_APPLICATION = 9
export const category_list = ['All', 'Writing Supplies', 'Desktop Products', 'Document Management Supplies', 'Paper Products', 'Financial Supplies', 'Accessories']
export const category_list2 = ['Writing Supplies', 'Desktop Products', 'Document Management Supplies', 'Paper Products', 'Financial Supplies', 'Accessories']

export const store_list = ['All', 'Foundation Building (North Campus)', 'Science Building (North Campus)', 'Center Building (North Campus)', 'Mathematics Building (North Campus)', 'Humanities and Social Sciences Building (South Campus)', 'Emerging Science Building (South Campus)', 'Business School (South Campus)']
export const store_list2 = ['Foundation Building (North Campus)', 'Science Building (North Campus)', 'Center Building (North Campus)', 'Mathematics Building (North Campus)', 'Humanities and Social Sciences Building (South Campus)', 'Emerging Science Building (South Campus)', 'Business School (South Campus)']

export const chooseStore = (building) => {
    if (building === 'centre building') {
        return 'Center Building (North Campus)'
    } else if (building === 'public building') {
        return 'Science Building (North Campus)'
    } else if (building === 'foundation building') {
        return 'Foundation Building (North Campus)'
    }
}



