export const fetchUserFeed = () => {
  return $.ajax({
    method: "GET",
    url: "/api/users/feed"
  });
};
