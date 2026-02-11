import { TItemData, TItemUpdate } from '../../schemas';
import { wretchInstance }         from '../index';





export const ItemApi = {
    create: (data: TItemData) =>
        wretchInstance
            .url('/items')
            .post(data)
            .json(),
    
    update: (itemId: string, updates: TItemUpdate) =>
        wretchInstance
            .url(`/item/${ itemId }`)
            .patch(updates)
            .json(),
    
    getProfile: (itemId: string) =>
        wretchInstance
            .url(`/items/${ itemId }`)
            .get()
            .json(),
    
    getAll: () =>
        wretchInstance
            .url('/items/organization')
            .get()
            .json(),
};