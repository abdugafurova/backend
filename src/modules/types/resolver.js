import { GraphQLUpload } from 'graphql-upload'

export default {
    Upload: GraphQLUpload,

    MainType: {
        __resolveType: object => {
            console.log(object);
            if (object.user_id && object.user_name) return 'User'
            else return null
        }
    },

    SortOptions: {
        toLargest: 2,
        toSmallest: 1
    }
}