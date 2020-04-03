import {
  SET_BLOG,
  SET_BLOGS,
  LIKE_BLOG,
  UNLIKE_BLOG,
  LOADING_DATA,
  POST_BLOG,
  DELETE_BLOG
} from "../types";

const initialState = {
  blogs: [],
  myBlog: {
    user: { username: "yash" }
  },
  loading: false
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_BLOG:
      return {
        ...state,
        myBlog: actions.payload
      };
    case SET_BLOGS:
      return {
        ...state,
        blogs: actions.payload,
        loading: false
      };
    //call SET_BLOG after like unlike
    case LIKE_BLOG:
      return {
        ...state,
        blogs: actions.payload,
        loading: false
      };
    case UNLIKE_BLOG:
      return {
        ...state,
        blogs: actions.payload,
        loading: false
      };
    case POST_BLOG:
      return {
        ...state,
        blogs: [actions.payload, ...state.blogs]
      };
    case DELETE_BLOG:
      let index = state.blogs.findIndex(blog => blog.id === actions.payload);
      state.blogs.splice(index, 1);
      return {
        ...state
      };
    default:
      return state;
  }
}
