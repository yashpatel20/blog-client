import { SET_BLOGS, LIKE_BLOG, UNLIKE_BLOG, LOADING_DATA } from "../types";

const initialState = {
  blogs: [],
  loading: false
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_BLOGS:
      return {
        ...state,
        blogs: actions.payload,
        loading: false
      };
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
    default:
      return state;
  }
}
