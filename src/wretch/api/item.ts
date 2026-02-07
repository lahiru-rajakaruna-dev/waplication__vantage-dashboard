import { TItemData }      from '../../schemas';
import { wretchInstance } from '../index';





export const ItemApi = {
    // Add new item
    create: (data: TItemData) =>
        wretchInstance
            .url('/item')
            .post(data)
            .json(),
    
    // Update item name
    updateName: (itemId: string, name: string) =>
        wretchInstance
            .url(`/item/update/name/${ itemId }`)
            .patch({ item_name: name })
            .json(),
    
    // Update item stock
    updateStock: (itemId: string, stock: number) =>
        wretchInstance
            .url(`/item/update/stock/${ itemId }`)
            .patch({ item_stock_unit_count: stock })
            .json(),
    
    // Get item profile
    getProfile: (itemId: string) =>
        wretchInstance
            .url(`/item/profile/${ itemId }`)
            .get()
            .json(),
    
    // Get all items
    getAll: () =>
        wretchInstance
            .url('/item/view/organization')
            .get()
            .json(),
};