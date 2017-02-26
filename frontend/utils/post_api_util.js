export const createPost = post => {
  return $.ajax({
    method: "POST",
    url: "/api/posts/",
    data: { post }
  });
};

export const fetchPost = id => {
  return $.ajax({
    method: "GET",
    url: `/api/posts/${id}`,
  });
};
