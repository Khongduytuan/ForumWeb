export const addPost = (data) =>{
    return{
        type: 'postList/addPost',
        payload: data
    }
}