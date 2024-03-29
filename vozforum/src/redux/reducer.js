const initSate = {
    filters:{
        title: '',
        topic: ''
    },
    postList:[
        {pID : 1, title :"hello", content :"Day la noi dung",author :"ktuan", dateAndTime :"22-03-2024", tag :"linh tinhhh", uID : 1},
        {pID : 2, title :"hello", content :"Day la noi dung 2", author :"ktuan", dateAndTime :"22-03-2024", tag :"linh tinh", uID : 1},
        {pID :3, title :"hello", content :"Day la noi dung 3", author :"ktuan", dateAndTime :"22-03-2024", tag :"linh tinh", uID : 1},
    ]
}

const rootReducer = (state = initSate, action) =>{
    switch(action.type){
        case 'postList/addPost':
            return{
                ...state,
                postList: [
                    ...state.postList,
                    {pID :4, title :"hello", content :"Day la noi dung 3", author :"ktuan", dateAndTime :"22-03-2024", tag :"linh tinh", uID : 1},
                ]
            }
        default:
            return state;
    }

}


export default rootReducer;